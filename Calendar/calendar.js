class Calendar{
    constructor(events=[]){
        this.events = events;
        this.today = new Date();
        console.log(this)
    }

    getFirstDayOfMonth(month){
        return new Date(this.today.getFullYear(), month, 1).getDay();
    }

    getLastDayOfMonth(month){
        return new Date(this.today.getFullYear(), month + 1, 0).getDate();
    }

    getDay(year, month, day){
        return new Date(year, month, day).getDate();
    }

    getTodaysEvents(day){
        let todaysEvents = [];
        for(i = 0; i < this.events.length(); i++){
            if(this.events[i].getDay() == day){
                todaysEvents.push(this.events[i]);
            }
        }
        return todaysEvents;
    }

    makeDay(events, num){
        let eventString = ``
        for(i = 0; i < events.length(); i++){
            eventString = eventString + `<li class="event">${events[i].getTitle()}</li>`;
        }
        return `<div class="day">
                    <p class="date">${num}</p>
                    <ul class="event-list">${events}</ul>
                </div>`
    }

    makePaddingDay(num){
        return `<div class="day">
                    <p class="padding-date">${num}</p>
                </div>`;
    }

    makeMonth(year, month){
        let firstDay = this.getFirstDayOfMonth(month);
        let lastDay = this.getLastDayOfMonth(month);
        let monthString = ``;
        for(i = 0; i > -firstDay; i--){
            let dayNum = this.getDay(year, month, i);
            monthString = this.makePaddingDay(dayNum) + monthString;
        }
        for(i = 0; i < lastDay; i++){
            let dayNum = this.getDay(year, month, i);
            let events = this.getTodaysEvents(dayNum);
            monthString = monthString + this.makeDay(events, dayNum);
        }
        return monthString;
    }

    addEvent(newEvent){
        this.events.push(newEvent);
        console.log(newEvent);
    }

    deleteEvent(index){
        this.events.splice(index, 1);
    }

    updateUI(){

    }
}

window.calendar = new Calendar();