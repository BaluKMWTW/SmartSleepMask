// SPO2 -> OSA


int event_duration = 0;
int spo2_reference = 0;
int mean = 0;
int spo2 = 0;
int spo2_prev = 0;
bool event = false
bool same_event;

mean = spo2 - spo2_prev;

if((mean <= -4) && (!event)) {
    // we start osa event
    event = true;
    spo2_reference = spo2;
}
//osa eventd
if(event) {
    if(spo2 <= spo2_reference) {
        // results every 1s so 10 iterations = 10s
        event_duration = event_duration + 1;
        // over 10s -> increment osa, don't increment same event more than once
        if((event_duration > 10) && (!same_event)) {
            osa_events = osa_events + 1;
            same_event = true
        }
    } else {
        // leave the event mode
        same_event = false
        event = false;
        event_duration = 0;
    }
    
    
}

