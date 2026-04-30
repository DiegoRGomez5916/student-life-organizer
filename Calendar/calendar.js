class Calendar{
    constructor(){
        this.entrys = this.loadEntrys();
        this.today = new Date();
    }

    loadEntrys(){
        const entryData = localStorage.getItem('entrys');
        if(entryData){
            return JSON.parse(entryData);
        }else{
            return [];
        }
    }

    saveEntrys(){
        localStorage.setItem('entrys', JSON.stringify(this.entrys));
    }

    sortEntrys(){
        this.entrys.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getUpcomingEntrys(){
        const today = new Date();
        let index = 0;
        this.sortEntrys();
        for(let i = 0; i < this.entrys.length; i++){
            if(today <= new Date(this.entrys[i].date + 'T' + this.entrys[i].start + ':00')){
                break;
            }else{
                index++;
            }
        }
        return this.entrys.slice(index, index + 3);
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

    getTodaysEntrys(day){
        return this.entrys.filter(x => {
            return x.date == day;
        });
    }

    makeDay(entrys, num){
        let entryString = ``;
        for(let i = 0; i < entrys.length; i++){
            if (entrys.length != 0){
                entryString = entryString + `<li class="entry" index="${i}" onclick="updateEntry(this)">${entrys[i].title}</li>`;
            }
        }
        return `<div class="day">
                    <p class="date">${num}</p>
                    <ul class="entry-list">${entryString}</ul>
                </div>`
    }

    makePaddingDay(entrys, num){
        let entryString = ``;
        for(let i = 0; i <= entrys.length; i++){
            if (entrys.length != 0){
                entryString = entryString + `<li class="entry">${entrys[i].getTitle()}</li>`;
            }
        }
        return `<div class="day">
                    <p class="padding-date">${num}</p>
                    <ul class="entry-list">${entryString}</ul>
                </div>`;
    }

    makeMonth(year, month){
        let firstDay = this.getFirstDayOfMonth(month);
        let lastDay = this.getLastDayOfMonth(month);
        let monthString = ``;
        for(let i = 0; i > -firstDay; i--){
            let dateStr = this.getDateStr(year, month, i);
            let dayNum = this.getDayNum(year, month, i);
            let todaysEntrys = this.getTodaysEntrys(dateStr);
            monthString = this.makePaddingDay(todaysEntrys, dayNum) + monthString;
        }
        for(let i = 1; i < lastDay + 1; i++){
            let dateStr = this.getDateStr(year, month, i);
            let dayNum = this.getDayNum(year, month, i);
            let todaysEntrys = this.getTodaysEntrys(dateStr);
            monthString = monthString + this.makeDay(todaysEntrys, dayNum);
        }
        return monthString;
    }

    addEntry(newEntry){
        this.entrys.push(newEntry);
        this.saveEntrys();
    }

    deleteEntry(index){
        this.entrys.splice(index, 1);
        this.saveEntrys();
    }
}

class Entry{
    constructor(title='', date='', start='', end=''){
        this.title = title;
        this.date = date;
        this.start = start;
        this.end = end;
    }
}