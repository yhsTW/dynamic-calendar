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

        const result = (
            // 시작 시간이 먼저인 것
            mAStart.diff(mBStart, 'days', true) ||
            // 일정의 기간이 긴 것
            mBEnd.diff(mBStart, 'days', true) - mAEnd.diff(mAStart, 'days', true) ||
            // 종일 이벤트
            checkAllDay(b, allDayKey) - checkAllDay(a, allDayKey) ||
            // 시간이 먼저인 것
            mAStart.diff(mBStart, 'hours', true)
        );

        return result;
    });

    return sort;
};

export default sortEvents;