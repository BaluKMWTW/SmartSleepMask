  #include <math.h>

  //Start Wifi
  #include <WiFi.h>
  #include <Firebase_ESP_Client.h>
  #define WIFI_SSID "iPhone (296)"
  #define WIFI_PASSWORD "12345678"
  //End Wifi

  //Start Firebase
  #include "addons/TokenHelper.h" //Provide the token generation process info.
  #include "addons/RTDBHelper.h"  //Provide the RTDB payload printing info and other helper functions.
  #define API_KEY "AIzaSyAD6GB8eazzw8Ucb-n_prtPFJxE_kXYQ3s" // Insert Firebase project API Key
  #define DATABASE_URL "https://sleepqualityanalysis-default-rtdb.firebaseio.com/" // Insert RTDB URLefine the RTDB URL */

  FirebaseData FirebaseData;  //Firebase data object
  FirebaseAuth auth;  //Firebase authentication object
  FirebaseConfig config;  //Firebase configuration object

  // Define variables for OSA tracking
  int event_duration = 0;
  int spo2_reference = 0;
  int mean = 0;
  int spo2_prev = 0;
  bool event = false;
  int osa_events = 0;

  TaskHandle_t PostToFirebase;
  bool signupOK = false;
  // End Firebase

  // Start Function Declaration
  void SendReadingsToFirebase();
  void InitializeWifi();
  void SignUpToFirebase();
  void InitializePOX();
  void event_check();
  void osafunc();

  // End Function Declaration

  // Start Pulse Oximeter
  #include <Wire.h>
  #include "MAX30100_PulseOximeter.h"
  #define POX_REPORTING_PERIOD_MS  1000

  PulseOximeter pox;  // Create a PulseOximeter object

  TaskHandle_t GetReadings;
  uint8_t _spo2;
  uint8_t _heartRate;

  uint32_t poxLastReport = 0;
  uint32_t prevMillis = 0;
  // End Pulse Oximeter

  void setup() {
    Serial.begin(115200); //Begin serial communication

    InitializeWifi();

    SignUpToFirebase();

    InitializePOX();

    xTaskCreatePinnedToCore(SensorReadings, "GetReadings", 1724, NULL, 0, &GetReadings, 0);
    
    xTaskCreatePinnedToCore(SendReadingsToFirebase, "PostToFirebase", 6268, NULL, 0, &PostToFirebase, 1);

    
    // NTP time sync
    configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");
  }

  void SensorReadings(void * parameter)
  {
    for(;;)
    {
      // Read from the sensor
      pox.update();
        
      if (millis() - poxLastReport > POX_REPORTING_PERIOD_MS) {
        _heartRate = round(pox.getHeartRate());
        _spo2 = round(pox.getSpO2());
      
        Serial.print("Heart rate:");  
        Serial.print(_heartRate);
        Serial.print("bpm / SpO2:");
        Serial.print(_spo2);
        Serial.println("%");
        event_check(_spo2);
        osafunc(_spo2);
        poxLastReport = millis();
        spo2_prev = _spo2;
      }
      // Memory Sizing
      //if (millis() - prevMillis > 6000)
      //{
      //  unsigned long remainingStack = uxTaskGetStackHighWaterMark(NULL);
      //  Serial.print("Free stack: ");
      //  Serial.print(remainingStack);
      //  prevMillis = millis();
      //}
      // End Memory Sizing
    }
  }
  void event_check(uint8_t spo2) { 
    mean = spo2 - spo2_prev;
    if((mean <= -4 ) && (!event)) { // deoxidations && event not happening atm
      event = true; // event mode on
      spo2_reference = spo2; // take the first deoxidation value for reference
    } 
  }
  void osafunc(uint8_t spo2) {
    if(event) {
      // event mode on 
      if(spo2 <= spo2_reference) { // ensure deoxidation baseline is held
        event_duration = event_duration + 1;
        if(event_duration == 10) { // can execute only once per event since we only increment
          osa_events = osa_events + 1;
        }
      } else {
        // leave event mode and reset the variables
        event = false;
        event_duration = 0;

      }
    }
  }
  #include <Firebase_ESP_Client.h>
  #include <time.h>

  void SendReadingsToFirebase(void * parameter)
  {
    for(;;)
    {
      if (Firebase.ready() && signupOK){
        // Get current timestamp
        time_t now;
        time(&now);
        char timestamp[20];
        snprintf(timestamp, sizeof(timestamp), "%ld", now);
        
        // Check if heart rate is greater than or equal to 30 and SpO2 is greater than or equal to 80
        
        // Construct path with timestamp and push heart rate value under HEARTRATE
        String heartRatePath = "HEARTRATE/" + String(now);
        if (Firebase.RTDB.setInt(&FirebaseData, heartRatePath.c_str(), _heartRate)){
            Serial.println("Heart rate sent to Firebase with timestamp.");
        }
        else {
            Serial.println("Failed to send heart rate to Firebase.");
            Serial.println("Reason: " + FirebaseData.errorReason());
        }
        
        // Construct path with timestamp and push SpO2 value under SPO2
        String spo2Path = "SPO2/" + String(now);
        if (Firebase.RTDB.setInt(&FirebaseData, spo2Path.c_str(), _spo2)){
            Serial.println("SpO2 sent to Firebase with timestamp.");
        }
        else {
            Serial.println("Failed to send SpO2 to Firebase.");
            Serial.println("Reason: " + FirebaseData.errorReason());
        }
        // send osa event count 
        if (Firebase.RTDB.pushInt(&FirebaseData, "OSA", osa_events)){
              Serial.println("OSA events sent to Firebase.");
          }
      }
    }
  }
  void InitializeWifi()
  {
    // Wifi Initialize ...
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    
    while (WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      delay(300);
    }
    
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
  }

  void SignUpToFirebase()
  {
    /* Assign the api key (required) */
    config.api_key = API_KEY;

    /* Assign the RTDB URL (required) */
    config.database_url = DATABASE_URL;

    /* Sign up */
    if (Firebase.signUp(&config, &auth, "", ""))
    {
      Serial.println("ok");
      signupOK = true;
    }
    else
    {
      Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
    
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
  }

  void InitializePOX()
  {
    Serial.print("Initializing pulse oximeter..");

    // Initialize sensor
    if (!pox.begin()) {
      Serial.println("FAILED");
      for(;;);
    } else {
      Serial.println("SUCCESS");
    }

    // Configure sensor to use 7.6mA for LED drive
    pox.setIRLedCurrent(MAX30100_LED_CURR_11MA);
  }

  void loop()
  {
    delay(1);  
  }
