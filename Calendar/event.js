class Event{
    constructor(title='', day='', start='', end=''){
        this.title = title;
        this.day = day;
        this.start = start;
        this.end = end;
        console.log(this)
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        const titlePattern = /^[\w\s]+$/;
        if (!titlePattern.test(title)){
            throw TypeError;
        }
        this.title = title;
    }

    getDay(){
        return this.day;
    }

    setDay(day){
        this.day = day;
    }

    getStart(){
        return this.start;
    }

    setStart(start){
        this.start = start;
    }

    getEnd(){
        return this.end;
    }

    setEnd(end){
        this.end = end;
    }
}