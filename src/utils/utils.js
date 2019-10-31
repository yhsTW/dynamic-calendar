import { MONTH_TYPE, AM_PM, CUSTOMIZE, WEEKEND_TYPE } from "./constants";
import moment from "moment";

// 컴포넌트를 정렬한다.
export const orderComponents = (order, components) => 
    order.map(type => components[type]);

const getCondition = ({ key, item, isToday }) => {
    switch(key) {
        case CUSTOMIZE.today :
            return isToday;

        case CUSTOMIZE.weekdays :
            return item.date.day() !== 0 && item.date.day() !== 6;
        
        case CUSTOMIZE.weekend :
            return item.date.day() === 0 ? item.date.day() === 0 : item.date.day() === 6;

        case CUSTOMIZE.prevMonth :
            return MONTH_TYPE.prev === item.type;

        case CUSTOMIZE.nextMonth : 
            return MONTH_TYPE.next === item.type;
    }
};

const makeConditions = ({ styleObj, item, isToday, property }) => {
    const keys = Object.keys(styleObj);
    let condition = [];

    for(let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        const currentCondition = getCondition({ key : currentKey, item, isToday, property });
        let useStyle = styleObj[currentKey][property];

        if(currentKey === CUSTOMIZE.weekend) {
            useStyle = useStyle[
                item.date.day() === 0 ? 
                WEEKEND_TYPE.sundayStyle : 
                WEEKEND_TYPE.saturdayStyle
            ]
        }

        condition.push({ condition : currentCondition, useStyle });
    }

    return condition;
};

// JSX의 inline에 사용할 style object를 만든다.
export const getStyle = ({ styleObj, item, isToday, property }) => {
    // TODO: holiday는 나중에
    let style = {};

    const conditions = makeConditions({ styleObj, item, isToday, property });

    for(let i = 0; i < conditions.length; i++) {
        const current = conditions[i];

        if(current.condition) style = { ...style, ...current.useStyle };
    }

    return style;
};

export const makeTimeFormat = date => {
    const hour = moment(date).hour();
    const min = moment(date).minute();

    return `
        ${ hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour) }:${ min.toString().length < 2 ? `0${ min }` : min }
        ${ hour > 12 ? AM_PM.pm : AM_PM.am }
    `;
};