function openAddEventWindow(){
    window.open(
    "addEventPopupWindow.html",
    "myPopupWindow",
    "width=500,height=500,left=200,top=150,resizable=yes,scrollbars=yes"
    );
}

function submitButton(newEvent){
    const eventTitle = document.getElementById('title').value;
    const eventDate = document.getElementById('date').value;
    const eventStartTime = document.getElementById('start').value;
    const eventEndTime = document.getElementById('end').value;
    try{
        newEvent.setTitle(eventTitle);
        newEvent.setDay(eventDate);
        newEvent.setStart(eventStartTime);
        newEvent.setEnd(eventEndTime);
        window.opener.calendar.addEvent(newEvent);
        window.close()
    }catch (error){
        alert(error)
    }
}

