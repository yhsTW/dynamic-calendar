import moment from 'moment';

const checkAllDay = (event, allDayKey) => {
    let allDay = false;

    if(typeof allDayKey === 'string') {
        allDay = event[allDayKey];
    } else {
        allDay = event[allDayKey.key] === allDayKey.allDayType;
    }

    return allDay;
};

const sortEvents = (events, { start : startKey, end : endKey, allDay : allDayKey }) => {
    if(!events) return [];
    
    const newEvents = [...events];
    const sort = newEvents.sort((a, b) => {
        const mAStart = moment(a[startKey]);
        const mAEnd = moment(a[endKey]);
        const mBStart = moment(b[startKey]);
        const mBEnd = moment(b[endKey]);
        
        if(!mAStart.isSame(mBStart, 'date')) {
            // a, b의 시작 날짜가 다를 경우
            if(mAStart.isBefore(mBStart, 'date')) {
                // a의 시작날짜가 더 빠를 경우 a가 우선순위
                return -1;
            } else if(mBStart.isBefore(mAStart, 'date')) {
                // b의 시작날짜가 더 빠를 경우 b가 우선순위
                return 1;
            }
        } else {
            // a, b의 시작 날짜가 같을 때
            if(mAEnd.isAfter(mBEnd, 'date')) {
                // a의 종료날짜가 더 이후에 있을 때
                return -1;
            } else if(mBEnd.isAfter(mAEnd, 'date')) {
                // b의 종료날짜가 더 이후에 있을 때
                return 1;
            } else {
                // a, b의 종료날짜가 모두 같을 때
                if(checkAllDay(a, allDayKey) && !checkAllDay(b, allDayKey)) {
                    // a만 종일일정일 경우 a가 우선순위
                    return -1;
                } else if(!checkAllDay(a, allDayKey) && checkAllDay(b, allDayKey)) {
                    // b만 종일일정일 경우 b가 우선순위
                    return 1;
                } else {
                    // 둘 다 종일/비종일일 때
                    if(mAEnd.isSameOrAfter(mBEnd)) {
                        // a가 종료 시간이 더 늦을 경우 a가 우선순위
                        return -1
                    } else {
                        // b가 종료 시간이 더 늦을 경우 b가 우선순위
                        return 1;
                    }
                }
            }
        }

        return 0;
    });

    return sort;
};

export default sortEvents;