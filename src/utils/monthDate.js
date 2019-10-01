import moment from 'moment';

let dateArr = [];
let item = [];
const WEEK_NUM = 7;

const getStartOf = date => date.startOf('month');

const getEndOf = date => date.endOf('month');

const setDateArr = arr => dateArr.push(arr);

const resetDateArr = () => dateArr = [];

const resetItem = () => item = [];

const setItem = date => {
    item.push(date);

    if(item.length === WEEK_NUM) {
        setDateArr(item);

        resetItem();
    }
};

const settingDate = (start, end, month, type = 'current') => {
    for(let i = start; i < end; i++) {
        const date = moment(month).date(i);
        
        setItem({ type, date });
    }
};

const monthDate = currentDate => {
    resetDateArr();

    const currentDateStartDay = getStartOf(currentDate).day();
    const currentDateEndDay = getEndOf(currentDate).day();
    
    if(currentDateStartDay !== 0) {
        const prevMonth = moment(currentDate).month(currentDate.month() - 1);
        const prevMonthStart = getEndOf(prevMonth).date() - getStartOf(currentDate).day() + 1;
        const prevMonthEnd = getEndOf(prevMonth).date() + 1;
        
        settingDate(prevMonthStart, prevMonthEnd, prevMonth, 'prev');
    }

    settingDate(getStartOf(currentDate).date(), getEndOf(currentDate).date() + 1, currentDate);
    
    if(getEndOf(currentDate).day() !== WEEK_NUM - 1) {
        const nextMonth = moment(currentDate).month(currentDate.month() + 1);
        const nextMonthStart = getStartOf(nextMonth).date();
        const nextMonthEnd = WEEK_NUM - currentDateEndDay;
        
        settingDate(nextMonthStart, nextMonthEnd, nextMonth, 'next');
    }
};

export const getDateArr = currentDate => {
    monthDate(currentDate);

    return dateArr;
};