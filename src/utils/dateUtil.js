import moment from 'moment';
import { AM_PM } from './constants';

// 시간을 '01:00 PM'과 같은 형식으로 변경한다.
export const makeTimeFormat = date => {
    const hour = moment(date).hour();
    const min = moment(date).minute();

    return `
        ${ hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour) }:${ min.toString().length < 2 ? `0${ min }` : min }
        ${ hour > 12 ? AM_PM.pm : AM_PM.am }
    `;
};

// parameter로 받은 date를 기준으로 해당 주의 일요일을 가져온다.
export const getSunday = date => moment(date).day(0);

// parameter로 받은 date를 기준으로 해당 주의 토요일을 가져온다.
export const getSaturday = date => moment(date).day(6);