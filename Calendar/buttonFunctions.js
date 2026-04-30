function openAddEntryWindow(){
    window.open(
    "../Calendar/addEntryPopupWindow.html",
    "myPopupWindow",
    "width=500,height=500,left=200,top=150,resizable=yes,scrollbars=yes"
    );
}

function openEntryPopupWindow(){
    return window.open(
        "../Calendar/entryPopupWindow.html",
        "myPopupWindow",
        "width=500,height=500,left=200,top=150,resizable=yes,scrollbars=yes"
    );
}

function updateUI(){
    const entrySection = document.getElementById('entrys');
    const monthString = window.calendar.makeMonth(window.calendar.today.getFullYear(), window.calendar.today.getMonth());
    entrySection.innerHTML = '';
    entrySection.innerHTML = monthString;
}

function updateMonthYear(){
    const month = window.calendar.today.toLocaleString('default', { month: 'short' });
    const yearNum = window.calendar.today.getFullYear();
    const monthYearSection = document.getElementById('month-year');
    monthYearSection.innerHTML = '';
    monthYearSection.innerHTML = month + ' ' + yearNum;
}

function submitButton(newEntry){
    const entryTitle = document.getElementById('title').value;
    const entryDate = document.getElementById('date').value;
    const entryStartTime = document.getElementById('start').value;
    const entryEndTime = document.getElementById('end').value;
    try{
        newEntry.title = entryTitle;
        newEntry.date = entryDate;
        newEntry.start = entryStartTime;
        newEntry.end = entryEndTime;
        window.opener.calendar.addEntry(newEntry);
        window.close();
    }catch (error){
        alert(error)
    }
    window.opener.updateUI()
}

function submitEditButton(newEntry){
    const entryTitle = document.getElementById('title').value;
    const entryDate = document.getElementById('date').value;
    const entryStartTime = document.getElementById('start').value;
    const entryEndTime = document.getElementById('end').value;
    try{
        newEntry.setTitle(entryTitle);
        newEntry.setDate(entryDate);
        newEntry.setStart(entryStartTime);
        newEntry.setEnd(entryEndTime);
        window.close();
    }catch (error){
        alert(error)
    }
    window.opener.updateUI()
}

function updateEntry(element){
    const index = element.getAttribute('index');
    let newWindow = openEntryPopupWindow();
    newWindow.newEntry = window.calendar.entrys[index];
    newWindow.newIndex = index;
    window.calendar.saveEntrys();
}

function deleteOpenedEntry(index){
    window.opener.calendar.deleteEntry(index);
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
