# CalendarioEduDigital

the general goal is to build a calendar, in wich we can make appointments of the occurences of a certain date
    Set the name for the the DOM
    
    const month will help the handle the renderCalendar function
    
    RenderCallendar function
      get the days of the month(Last and first)
          we have 3 "for" loops to help render the days of the prev month, current month, next month.
          
    The eventlisteners in the ".prev" and ".next" elements will change the month we desire to see
        ...and the ".event_btn" will make de ocurrence section appear and disapear
        
    We have 3 classes to manage the events
      Event responsible for instante the events
      UI responsible to manage the events on the UI(displa and delete the events)
      Store responsible for store, add,remove every event inside the array and localStorage,
      
    The function saveOcurrence, have to goals catch the picked date by the user and use it to instantiate the ecent object
     
    The eventlistener on event-list display the events of the selected day and removes if necessary
