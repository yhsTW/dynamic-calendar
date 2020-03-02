import _ from 'lodash';
import moment from 'moment';

// object, array 모두 체크 가능
const referenceCheck = (value, other) => {
    return _.isEqual(value, other);
};

export const arrayCheck = (value, other) => {
    return referenceCheck(value, other);
};

export const objectCheck = (value, other) => {
    return referenceCheck(value, other);
};

export const dateCheck = (value, other) => {
    return moment(value).isSame(other, 'date');
};

export const variablesCheck = (value, other) => {
    return value === other;
};