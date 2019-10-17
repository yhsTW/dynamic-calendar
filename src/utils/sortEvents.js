import moment from 'moment';

const sortEvents = events => {
    if(!events) return [];

    const sort = events.sort((a, b) => {
        const mAStart = moment(a.start);
        const mAEnd = moment(a.end);
        const mBStart = moment(b.start);
        const mBEnd = moment(b.end);

        if(mAStart < mBStart && mAEnd - mAStart > mBEnd - mBStart) {
            return -4;
        }
        
        if(mAStart < mBStart) {
            return -3;
        }
        
        // 시작 일정이 같은 날일 때, 일정의 길이가 긴 것이 우선순위
        if(mAStart.isSame(mBStart) && mAEnd - mAStart > mBEnd - mBStart) {
            return -1;
        }

        return 1;
    });

    return sort;
};

export default sortEvents;