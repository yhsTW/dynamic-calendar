import moment from 'moment';

const getCurrentStart = (currentEvent, startKey) => moment(currentEvent[startKey]);
const getCurrentEnd = (currentEvent, endKey) => moment(currentEvent[endKey]);

const getEventLevel = (start, end, events, { id : idKey, start : startKey, end : endKey }) => {
    const newEvents = [...events];
    let resultEvents = [];
    
    while(newEvents.length > 0) {
        let sameEvents = [];
        let currentEvent = newEvents.splice(0, 1)[0];
        sameEvents.push(currentEvent);
        // 현재 이벤트의 시작시간이 현재 Row의 시작보다 이전이고,
        // 현재 이벤트의 종료시간이 현재 Row의 끝보다 이후이면,
        // 같은 이벤트를 찾을 필요 없이, 바로 return할 배열에 집어 넣는다.
        if(getCurrentStart(currentEvent, startKey).isSameOrBefore(start.date) && getCurrentEnd(currentEvent, endKey).isSameOrAfter(end.date)) {
            resultEvents.push([currentEvent]);
            
            continue;
        }
        
        // 같은 Row에 있어야 할 event를 찾는다.
        const compareEvents = [...newEvents];

        while(compareEvents.length > 0) {
            const compareEvent = compareEvents.splice(0, 1)[0];
            const compareStart = moment(compareEvent[startKey]);
            const compareEnd = moment(compareEvent[endKey]);
            
            if(getCurrentEnd(currentEvent, endKey).isBefore(compareStart, 'date')) {
                sameEvents.push(compareEvent);
                const removeIdx = newEvents.findIndex(event => (event[idKey] === compareEvent[idKey] && moment(event[startKey]).isSame(compareEvent[startKey])));
                newEvents.splice(removeIdx, 1);
                
                if(compareEnd.isSameOrAfter(end.date, 'date')) break;
                
                currentEvent = compareEvent;
            }
        }

        resultEvents.push(sameEvents);
    }

    return resultEvents;
};

export default getEventLevel;