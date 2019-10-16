import { MONTH_TYPE, AM_PM } from "../variables";

// 컴포넌트를 정렬한다.
export const orderComponents = (order, components) => order.map(type => components[type]);

const getConditions = ({ styleObj, item, isToday, property }) => {
    return [
        // 오늘인지 확인
        // { condition : isToday, useStyle : styleObj.customizeToday[property] },
        { condition : item.date.day() !== 0 && item.date.day() !== 6, useStyle : styleObj.weekdays[property] },
        { condition : item.date.day() === 0, useStyle : styleObj.weekend[property].sundayStyle },
        { condition : item.date.day() === 6, useStyle : styleObj.weekend[property].saturdayStyle },
        { condition : MONTH_TYPE.prev === item.type, useStyle : styleObj.prevMonth[property] },
        { condition : MONTH_TYPE.next === item.type, useStyle : styleObj.nextMonth[property] }
    ];
};

// JSX의 inline에 사용할 style object를 만든다.
export const getStyle = ({ styleObj, item, isToday, property }) => {
    // TODO: holiday는 나중에
    let style = {};

    const conditions = getConditions({ styleObj, item, isToday, property });

    for(let i = 0; i < conditions.length; i++) {
        const current = conditions[i];

        if(current.condition) style = { ...style, ...current.useStyle };
    }

    return style;
};

export const makeTimeFormat = date => {
    const hour = date.hour();
    const min = date.minute();

    return `
        ${ hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour) }:${ min.toString().length < 2 ? `0${ min }` : min }
        ${ hour > 12 ? AM_PM.pm : AM_PM.am }
    `;
};