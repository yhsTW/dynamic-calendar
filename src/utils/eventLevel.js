import moment from 'moment';

const getEventLevel = (start, end, events, { id : idKey, start : startKey, end : endKey }) => {
    const newEvents = [...events];
    let returnEvents = [];
    
    while(newEvents.length > 0) {
        const currentEvent = newEvents.shift();
        const currentStart = moment(currentEvent[startKey]);
        const currentEnd = moment(currentEvent[endKey]);
        
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
            if((moment(event[endKey]).isBefore(currentStart, 'date') ||
            moment(event[startKey]).isAfter(currentEnd, 'date'))) {
                let overlap = false;

                sameLevel.forEach(level => {
                    if(
                        !(moment(event[endKey]).isBefore(level[startKey], 'date') ||
                        moment(event[startKey]).isAfter(level[endKey], 'date'))
                        ) {
                            overlap = true;
                    }
                });

                !overlap && sameLevel.push(event);
            }
        });

        if(sameLevel.length > 0) {
            sameLevel.forEach(event => 
                newEvents.splice(newEvents.findIndex(find => find[idKey] === event[idKey]), 1)
            );
                
            returnEvents.push([currentEvent, ...sameLevel]);
        } else {
            returnEvents.push([currentEvent]);
        }
    }

    return returnEvents;
};

export default getEventLevel;