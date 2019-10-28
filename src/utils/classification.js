import moment from 'moment';

let classificationEvents = [];

const isCurrentEvent = (event, currentDate) => {
    return moment(currentDate).isBetween(moment(event.start), moment(event.end), 'month', '[]') 
        || moment(currentDate).startOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).startOf('month').isSame(moment(event.end), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.end), 'week');
};

export const classification = (events, currentDate) => {
    const currentFirstWeek = moment(currentDate).startOf('month').week();
    const currentLastWeek = moment(currentDate).month() === 11 && moment(currentDate).endOf('month').week() === 1 ? 
        moment(currentDate).weeksInYear() + moment(currentDate).endOf('month').week() : 
        moment(currentDate).endOf('month').week();

    events.forEach(event => {
        // console.log(isCurrentEvent(event, currentDate))
        if(isCurrentEvent(event, currentDate)) {
            let startWeek = moment(event.start).week();
            let endWeek = moment(event.end).week();
            // console.log('==================================================')
            // console.log('event : ', event);
            // console.log('startWeek1 : ', startWeek);
            // console.log('endWeek1 : ', endWeek);
            
            if(moment(currentDate).month() === 11) {
                if(moment(event.start).week() === 1) {
                    startWeek = moment(event.start).weeksInYear() + moment(event.start).week();
                }
                
                if(moment(event.end).week() === 1 || moment(event.end).year() !== moment(currentDate).year()) {
                    endWeek = moment(event.end).weeksInYear() + moment(event.end).week();
                }
            }
            
            // console.log('startWeek2 : ', startWeek);
            // console.log('endWeek2 : ', endWeek);
            const start = currentFirstWeek > startWeek ? 0 : startWeek - currentFirstWeek;
            const end = currentLastWeek < endWeek ? currentLastWeek - currentFirstWeek : endWeek - currentFirstWeek;
            // console.log('start : ', start);
            // console.log('end : ', end)
            // console.log('==================================================')
            for(let i = start; i <= end; i++) {
                if(!classificationEvents[i]) {
                    classificationEvents[i] = [];
                }
    
                classificationEvents[i].push(event);
            }
        }
    });
    
    const returnArr = classificationEvents;
    classificationEvents = [];

    return returnArr;
};