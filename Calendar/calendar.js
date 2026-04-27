class Calendar{
    constructor(events=[]){
        this.events = events;
        this.today = new Date();
    }

    sortEvents(){
        this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getUpcomingEvents(){
        const today = new Date();
        let index = 0
        this.sortEvents();
        for(let i = 0; i < this.events.length; i++){
            if(today <= new Date(this.events[i].getDate() + 'T' + this.events[i].getStart() + ':00')){
                break;
            }else{
                index++;
            }
        }
        return this.events.slice(index, index + 3);
    }

    getFirstDayOfMonth(month){
        return new Date(this.today.getFullYear(), month, 1).getDay();
    }

    getLastDayOfMonth(month){
        return new Date(this.today.getFullYear(), month + 1, 0).getDate();
    }

    getDateStr(year, month, day){
        const d = new Date(year, month, day);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }

    getDayNum(year, month, day){
        return new Date(year, month, day).getDate();
    }

    getTodaysEvents(day){
        return this.events.filter(x => {
            return x.getDate() == day;
        });
    }

    makeDay(events, num){
        let eventString = ``;
        for(let i = 0; i < events.length; i++){
            if (events.length != 0){
                eventString = eventString + `<li class="event" index="${i}" onclick="updateEvent(this)">${events[i].getTitle()}</li>`;
            }
        }
        return `<div class="day">
                    <p class="date">${num}</p>
                    <ul class="event-list">${eventString}</ul>
                </div>`
    }

    makePaddingDay(events, num){
        let eventString = ``;
        for(let i = 0; i <= events.length; i++){
            if (events.length != 0){
                eventString = eventString + `<li class="event">${events[i].getTitle()}</li>`;
            }
        }
        return `<div class="day">
                    <p class="padding-date">${num}</p>
                    <ul class="event-list">${eventString}</ul>
                </div>`;
    }

    makeMonth(year, month){
        let firstDay = this.getFirstDayOfMonth(month);
        let lastDay = this.getLastDayOfMonth(month);
        let monthString = ``;
        for(let i = 0; i > -firstDay; i--){
            let dateStr = this.getDateStr(year, month, i);
            let dayNum = this.getDayNum(year, month, i);
            let todaysEvents = this.getTodaysEvents(dateStr);
            monthString = this.makePaddingDay(todaysEvents, dayNum) + monthString;
        }
        for(let i = 1; i < lastDay + 1; i++){
            let dateStr = this.getDateStr(year, month, i);
            let dayNum = this.getDayNum(year, month, i);
            let todaysEvents = this.getTodaysEvents(dateStr);
            monthString = monthString + this.makeDay(todaysEvents, dayNum);
        }
        return monthString;
    }

    addEvent(newEvent){
        this.events.push(newEvent);
    }

    deleteEvent(index){
        this.events.splice(index, 1);
    }
}

window.calendar = new Calendar();