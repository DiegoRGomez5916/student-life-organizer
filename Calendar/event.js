class Event{
    constructor(title='', date='', start='', end=''){
        this.title = title;
        this.date = date;
        this.start = start;
        this.end = end;
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

    getDate(){
        return this.date;
    }

    setDate(date){
        this.date = date;
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