function openAddEventWindow(){
    window.open(
    "addEventPopupWindow.html",
    "myPopupWindow",
    "width=500,height=500,left=200,top=150,resizable=yes,scrollbars=yes"
    );
}

function openEventPopupWindow(){
    return window.open(
        "eventPopupWindow.html",
        "myPopupWindow",
        "width=500,height=500,left=200,top=150,resizable=yes,scrollbars=yes"
    );
}

function updateUI(){
    const eventSection = document.getElementById('events');
    const monthString = window.calendar.makeMonth(window.calendar.today.getFullYear(), window.calendar.today.getMonth());
    eventSection.innerHTML = '';
    eventSection.innerHTML = monthString;
}

function updateMonthYear(){
    const month = window.calendar.today.toLocaleString('default', { month: 'short' });
    const yearNum = window.calendar.today.getFullYear();
    const monthYearSection = document.getElementById('month-year');
    monthYearSection.innerHTML = '';
    monthYearSection.innerHTML = month + ' ' + yearNum;
}

function submitButton(newEvent){
    const eventTitle = document.getElementById('title').value;
    const eventDate = document.getElementById('date').value;
    const eventStartTime = document.getElementById('start').value;
    const eventEndTime = document.getElementById('end').value;
    try{
        newEvent.setTitle(eventTitle);
        newEvent.setDate(eventDate);
        newEvent.setStart(eventStartTime);
        newEvent.setEnd(eventEndTime);
        window.opener.calendar.addEvent(newEvent);
        window.close();
    }catch (error){
        alert(error)
    }
    window.opener.updateUI()
}

function submitEditButton(newEvent){
    const eventTitle = document.getElementById('title').value;
    const eventDate = document.getElementById('date').value;
    const eventStartTime = document.getElementById('start').value;
    const eventEndTime = document.getElementById('end').value;
    try{
        newEvent.setTitle(eventTitle);
        newEvent.setDate(eventDate);
        newEvent.setStart(eventStartTime);
        newEvent.setEnd(eventEndTime);
        window.close();
    }catch (error){
        alert(error)
    }
    window.opener.updateUI()
}

function updateEvent(element){
    const index = element.getAttribute('index');
    let newWindow = openEventPopupWindow();
    newWindow.newEvent = window.calendar.events[index];
    newWindow.newIndex = index;
}

function deleteOpenedEvent(index){
    window.opener.calendar.deleteEvent(index);
    window.opener.updateUI();
    window.close();
}

function nextMonth(){
    const nextMonth = window.calendar.today.getMonth() + 1;
    window.calendar.today.setMonth(nextMonth);
    updateUI();
    updateMonthYear();
}

function lastMonth(){
    const lastMonth = window.calendar.today.getMonth() - 1;
    window.calendar.today.setMonth(lastMonth);
    updateUI();
    updateMonthYear();
}

updateUI()
updateMonthYear()