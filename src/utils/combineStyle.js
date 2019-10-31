import { MONTH_TYPE, CUSTOMIZE, WEEKEND_TYPE } from "./constants";

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
const combineStyle = ({ styleObj, item, isToday, property }) => {
    // TODO: holiday는 나중에
    let style = {};

    const conditions = makeConditions({ styleObj, item, isToday, property });

    for(let i = 0; i < conditions.length; i++) {
        const current = conditions[i];

        if(current.condition) style = { ...style, ...current.useStyle };
    }

    return style;
};

export default combineStyle;