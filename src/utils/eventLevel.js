import moment from 'moment';

const getEventLevel = (start, end, events) => {
    console.log('getEventLevel : ', start, end, events)
    const newEvents = [...events];
    let returnEvents = [];
    
    while(newEvents.length > 0) {
        const currentEvent = newEvents.shift();
        const currentStart = moment(currentEvent.start);
        const currentEnd = moment(currentEvent.end);
        
        // 현재 이벤트의 시작시간이 현재 Row의 시작보다 이전이고,
        // 현재 이벤트의 종료시간이 현재 Row의 끝보다 이후이면,
        // 같은 이벤트를 찾을 필요 없이, 바로 return할 배열에 집어 넣는다.
        if(currentStart.isSameOrBefore(start.date) && currentEnd.isSameOrAfter(end.date)) {
            returnEvents.push([currentEvent]);
            
            continue;
        }
        
        // 같은 Row에 있어야 할 event를 찾는다.
        let sameLevel = [];
        newEvents.forEach(event => {
            if((moment(event.end).isBefore(currentStart, 'date') ||
            moment(event.start).isAfter(currentEnd, 'date'))) {
                console.log('sameLevel : ', sameLevel);
                let overlap = false;

                sameLevel.forEach(level => {
                    if(
                        !(moment(event.end).isBefore(level.start, 'date') ||
                        moment(event.start).isAfter(level.end, 'date'))
                        ) {
                            overlap = true;
                    }
                });

                !overlap && sameLevel.push(event);
            }
        });
        
        if(sameLevel.length > 0) {
            sameLevel.forEach(event => 
                newEvents.splice(newEvents.findIndex(find => find.id === event.id), 1)
            );
                
            returnEvents.push([ currentEvent, ...sameLevel]);
        } else {
            returnEvents.push([currentEvent]);
        }
    }

    return returnEvents;
};

export default getEventLevel;