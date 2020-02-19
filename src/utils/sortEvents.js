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

const checkLongEvent = (start, end) => {
    return moment(end).diff(start, 'days', true);
};

const sortEvents = (events, { start : startKey, end : endKey, allDay : allDayKey }) => {
    if(!events) return [];
    
    const newEvents = [...events];
    const sort = newEvents.sort((a, b) => {
        const mAStart = moment(a[startKey]);
        const mAEnd = moment(a[endKey]);
        const mBStart = moment(b[startKey]);
        const mBEnd = moment(b[endKey]);

        if(mAStart.diff(mBStart, 'days', true) < 0 && checkLongEvent(mAStart, mAEnd) > checkLongEvent(mBStart, mBEnd)) {
            // 시작일이 먼저이면서 일정의 길이가 제일 긴 것
            return -1;
        } else if(mAStart.diff(mBStart, 'days', true) < 0) {
            // 시작일이 먼저인 것
            return -1;
        } else if(mAStart.isSame(mBStart, 'date') && (checkLongEvent(mAStart, mAEnd) !== checkLongEvent(mBStart, mBEnd)) && (checkLongEvent(mAStart, mAEnd) > checkLongEvent(mBStart, mBEnd))) {
            // 장기일정인 일정 두 개가 시작일이 같지만 길이가 다르다면 길이가 긴 것부터
            return -1;
        } else if(mAStart.isSame(mBStart, 'date') && (checkLongEvent(mAStart, mAEnd) !== 0 && checkLongEvent(mBStart, mBEnd) !== 0) && (checkLongEvent(mAStart, mAEnd) === checkLongEvent(mBStart, mBEnd)) && checkAllDay(a, allDayKey) - checkAllDay(b, allDayKey) === 1) {
            // 장기일정인 일정 두 개가 시작일이 같고 길이가 같다면 종일 일정먼저
            return -1;
        } else if(mAStart.isSame(mBStart, 'date') && (checkLongEvent(mAStart, mAEnd) === 0 && checkLongEvent(mBStart, mBEnd) === 0) && checkAllDay(a, allDayKey) - checkAllDay(b, allDayKey) === 1) {
            // 시작일이 같은 일정 두 개가 하루 일정이라면 종일 일정 먼저
            return -1;
        } else if(mAStart.isSame(mBStart, 'date') && (checkLongEvent(mAStart, mAEnd) === 0 && checkLongEvent(mBStart, mBEnd) === 0) && checkAllDay(a, allDayKey) - checkAllDay(b, allDayKey) === 0 && mAStart.diff(mBStart, 'hour', true) < 0) {
            return -1;
        } else {
            return 1;
        }
    });

    return sort;
};

export default sortEvents;