import moment from 'moment';

const sortEvents = (events, { start : startKey, end : endKey }) => {
    if(!events) return [];
    
    const newEvents = [...events];
    const sort = newEvents.sort((a, b) => {
        const mAStart = moment(a[startKey]);
        const mAEnd = moment(a[endKey]);
        const mBStart = moment(b[startKey]);
        const mBEnd = moment(b[endKey]);

        return (
            // 시작 시간이 먼저인 것
            mAStart.diff(mBStart, 'days') ||
            // 일정의 기간이 긴 것
            mBEnd.diff(mBStart, 'days') - mAEnd.diff(mAStart, 'days') ||
            // 종일 이벤트
            b.allDay - a.allDay ||
            // 시간이 먼저인 것
            mAStart.diff(mBStart, 'hours')
        )
    });

    return sort;
};

export default sortEvents;