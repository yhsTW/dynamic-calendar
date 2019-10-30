import moment from 'moment';
import { MONTH_TYPE } from './constants';

const START_TIME = 0;
const END_TIME = 23;

const getTimeArr = () => {
    let timeArr = [];
    
    for(let i = START_TIME; i <= END_TIME; i++) {
        timeArr.push([
            { date : moment().set({ hour : i, minute : 0, second : 0 }), type : MONTH_TYPE.current }, 
            { date : moment().set({ hour : i, minute : 30, second : 0 }), type : MONTH_TYPE.current }
        ]);
    }

    return timeArr;
};

export default getTimeArr;