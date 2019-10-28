import moment from 'moment';

const sortEvents = events => {
    if(!events) return [];
    
    const newEvents = [...events];
    const sort = newEvents.sort((a, b) => {
        const mAStart = moment(a.start);
        const mAEnd = moment(a.end);
        const mBStart = moment(b.start);
        const mBEnd = moment(b.end);

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