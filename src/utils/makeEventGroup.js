import moment from 'moment';

let group = [];

// 현재 사용자가 보고있는 달의 이벤트인지 확인한다.
const isCurrentEvent = (event, currentDate) => {
    return moment(currentDate).isBetween(moment(event.start), moment(event.end), 'month', '[]') 
        || moment(currentDate).startOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).startOf('month').isSame(moment(event.end), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.start), 'week')
        || moment(currentDate).endOf('month').isSame(moment(event.end), 'week');
};

// 이벤트를 주(week) 별로 나눈다.
export const makeEventGroup = (events, currentDate) => {
    // 현재 달(month)의 첫 번째 날이 올해의 몇 번째 주인지 확인한다.
    const currentFirstWeek = moment(currentDate).startOf('month').week();
    // 현재 달(month)의 마지막 날이 올해의 몇 번째 주인지 확인한다.
    // 12월 마지막 주에서 1월 1일이 들어가는 경우, 내년으로 간주, 내년의 첫 번째 주로 계산이 되어 버그가 발생했다.
    // 따라서 12월 마지막 주의 바로 전주의 주(week)를 구해 마지막 주를 더해준다.
    const currentLastWeek = moment(currentDate).month() === 11 && moment(currentDate).endOf('month').week() === 1 ? 
        moment(currentDate).weeksInYear() + moment(currentDate).endOf('month').week() : 
        moment(currentDate).endOf('month').week();

    events.forEach(event => {
        if(isCurrentEvent(event, currentDate)) {
            // 이벤트 시작일의 주차를 가져온다.
            let startWeek = moment(event.start).week();
            // 이벤트 종료일의 주차를 가져온다.
            let endWeek = moment(event.end).week();
            
            // 현재 사용자가 보고있는 날의 달(month)가 12월일 경우
            if(moment(currentDate).month() === 11) {
                // 이벤트 시작일이 해당 년도의 첫째주일 경우
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