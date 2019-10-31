import moment from 'moment';
import { AM_PM } from './constants';

export const makeTimeFormat = date => {
    const hour = moment(date).hour();
    const min = moment(date).minute();

    return `
        ${ hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour) }:${ min.toString().length < 2 ? `0${ min }` : min }
        ${ hour > 12 ? AM_PM.pm : AM_PM.am }
    `;
};
