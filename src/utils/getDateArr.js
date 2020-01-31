import moment from 'moment';
import { MONTH_TYPE, WEEK_NUM } from './constants';

let dateArr = [];
let item = [];

const getStartOf = date => moment(date).startOf('month');

const getEndOf = date => moment(date).endOf('month');

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

const resetTime = date => {
    return date.set({ hour : 0, minute : 0, second : 0 });
};

const settingDate = (start, end, month, type = MONTH_TYPE.current) => {
    for(let i = start; i < end; i++) {
        const date = resetTime(moment(month).date(i));
        
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
        
        settingDate(prevMonthStart, prevMonthEnd, prevMonth, MONTH_TYPE.prev);
    }

    settingDate(getStartOf(currentDate).date(), getEndOf(currentDate).date() + 1, currentDate);
    
    if(getEndOf(currentDate).day() !== WEEK_NUM - 1) {
        const nextMonth = moment(currentDate).month(currentDate.month() + 1);
        const nextMonthStart = getStartOf(nextMonth).date();
        const nextMonthEnd = WEEK_NUM - currentDateEndDay;
        
        settingDate(nextMonthStart, nextMonthEnd, nextMonth, MONTH_TYPE.next);
    }
};

const getDateArr = currentDate => {
    monthDate(currentDate);
    
    return dateArr;
};

export default getDateArr;