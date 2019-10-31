import moment from 'moment';

let group = [];

const isCurrentEvent = (event, currentDate) => {
    return moment(currentDate).isBetween(moment(event.start), moment(event.end), 'month', '[]') 
        || moment(currentDate).startOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).startOf('month').isSame(moment(event.end), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.end), 'week');
};

export const makeEventGroup = (events, currentDate) => {
    const currentFirstWeek = moment(currentDate).startOf('month').week();
    const currentLastWeek = moment(currentDate).month() === 11 && moment(currentDate).endOf('month').week() === 1 ? 
        moment(currentDate).weeksInYear() + moment(currentDate).endOf('month').week() : 
        moment(currentDate).endOf('month').week();

    events.forEach(event => {
        if(isCurrentEvent(event, currentDate)) {
            let startWeek = moment(event.start).week();
            let endWeek = moment(event.end).week();
            
            if(moment(currentDate).month() === 11) {
                if(moment(event.start).week() === 1) {
                    startWeek = moment(event.start).weeksInYear() + moment(event.start).week();
                }
                
                if(moment(event.end).week() === 1 || moment(event.end).year() !== moment(currentDate).year()) {
                    endWeek = moment(event.end).weeksInYear() + moment(event.end).week();
                }
            }
            
            const start = currentFirstWeek > startWeek ? 0 : startWeek - currentFirstWeek;
            const end = currentLastWeek < endWeek ? currentLastWeek - currentFirstWeek : endWeek - currentFirstWeek;

            for(let i = start; i <= end; i++) {
                if(!group[i]) {
                    group[i] = [];
                }
    
                group[i].push(event);
            }
        }
    });
    
    const returnArr = group;
    group = [];

    return returnArr;
};