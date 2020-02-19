import moment from 'moment';

const dummyEvents = [];

const getAllDay = () => Math.round(Math.random()) ? true : false;

const getMonth = (start, end) => {
    const diffYear = moment(end).diff(start, 'year');
    const mEndMonth = moment(end).month();
    const endMonth = diffYear !== 0 ? (diffYear * 12) + mEndMonth : mEndMonth;

    return Math.floor(Math.random() * (endMonth - moment(start).month() + 1)) + moment(start).month();
};

const getDate = (month, startDate = 1) => {
    const endOf = moment().month(month).endOf('month').date();
    return Math.floor(Math.random() * (endOf - startDate)) + startDate;
};

const getHour = (startHour = 0) => {
    return Math.floor(Math.random() * (24 - startHour)) + startHour;
};

const getMinute = (startMin = 0) => {
    return Math.floor(Math.random() * (60 - startMin)) + startMin;
};

const getStart = (start, end) => {
    const year = moment(start).year();
    const month = getMonth(start, end);
    const date = getDate(month);
    const hour = getHour();
    const minute = getMinute();
    
    return new Date(moment().set({ year, month, date, hour, minute, second : 0 }));
};

const getEnd = (start, end) => {
    const mStart = moment(start);
    const year = mStart.year();
    const month = getMonth(mStart, end);
    const date = getDate(month, mStart.date());
    const hour = getHour(mStart.hour());
    const minute = getMinute(mStart.minute());
    
    return new Date(moment().set({ year, month, date, hour, minute, second : 0 }));
};

const makeDummy = (start, end, amount) => {
    let index = 10000;

    if(dummyEvents.length > 0) {
        index =  dummyEvents[dummyEvents.length - 1].id + 1;
    }

    for(let i = index; i < index + amount; i++) {
        const eventStart = getStart(start, end);

        dummyEvents.push({
            id : i,
            title : `[DUMMY]_일정 더미 데이터 ${ i }`,
            start : eventStart,
            end : getEnd(eventStart, end),
            allDay : getAllDay()
        });
    }
    
    return dummyEvents;
};

export const getDummyEvents = (start, end, amount) => {
    return makeDummy(start, end, amount);
};