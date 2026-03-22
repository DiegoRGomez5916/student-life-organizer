export class Event{
    constructor(title, day, time, duration){
        this.title = title;
        this.day = day;
        this.time = time;
        this.duration = duration;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getDay(){
        return this.day;
    }

    setDay(day){
        this.day = day;
    }

    getTime(){
        return this.time;
    }

    setTime(time){
        this.time = time;
    }

    getDuration(){
        return this.duration;
    }

    setDuration(duration){
        this.duration = duration;
    }
}