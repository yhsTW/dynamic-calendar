const MONTH = 'month';
const WEEK = 'week';
const DAY = 'day';

// component names
const HEADER = 'Header';
const CONTROLS = 'Controls';
const VIEW_CONTROLS = 'ViewControls';
const LABEL = 'Label';

// controls type
const TODAY = 'today';
const PREV = 'prev';
const NEXT = 'next';

// position
const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';
const CENTER = 'center';

// month type
const CURRENT_MONTH = 'current';
const PREV_MONTH = 'prev';
const NEXT_MONTH = 'next';

// AM, PM
const AM = 'AM';
const PM = 'PM';

// customize keys
const CUSTOMIZE_HEADER = 'Header';
const CUSTOMIZE_ORDER = 'order';
const CUSTOMIZE_STYLE = 'style';
const CUSTOMIZE_VIEW = 'View';
const CUSTOMIZE_CONTROLS = 'Controls';
const CUSTOMIZE_LABEL = 'Label';
const CUSTOMIZE_VIEW_CONTROLS = 'ViewControls';
const CUSTOMIZE_BACKGROUND_CELL = 'BackgroundCell';
const CUSTOMIZE_POPUP = 'Popup';
const CUSTOMIZE_MORE = 'More';
const CUSTOMIZE_TODAY = 'today';
const CUSTOMIZE_HOLIDAY = 'holiday';
const CUSTOMIZE_WEEKEND = 'weekend';
const CUSTOMIZE_WEEKDAYS = 'weekdays';
const CUSTOMIZE_PREV_MONTH = 'prevMonth';
const CUSTOMIZE_NEXT_MONTH = 'nextMonth';

// Weekend Type
const SATURDAY_STYLE = 'saturdayStyle';
const SUNDAY_STYLE = 'sundayStyle';

// property
const BACKGROUND_CELL_STYLE = 'backgroundCellStyle';
const DATE_HEADER_STYLE = 'dateHeaderStyle';

export const WEEK_DATA = ['일', '월', '화', '수', '목', '금', '토'];

// format
export const FORMAT = 'yyyy년 mm월';

export const WEEK_NUM = 7

export const VIEW_TYPE = {
    month : MONTH,
    week : WEEK,
    day : DAY
};

export const COMPONENT_NAMES = {
    header : HEADER,
    controls : CONTROLS,
    viewControls : VIEW_CONTROLS,
    label : LABEL
};

export const CONTROLS_TYPE = {
    today : TODAY,
    prev : PREV,
    next : NEXT
};

export const POSITION = {
    top : TOP,
    right : RIGHT,
    bottom : BOTTOM,
    left : LEFT,
    center : CENTER
};

export const MONTH_TYPE = {
    current : CURRENT_MONTH,
    prev : PREV_MONTH,
    next : NEXT_MONTH
};

export const AM_PM = {
    am : AM,
    pm : PM
};

export const CUSTOMIZE = {
    header : CUSTOMIZE_HEADER,
    order : CUSTOMIZE_ORDER,
    style : CUSTOMIZE_STYLE,
    view : CUSTOMIZE_VIEW,
    controls : CUSTOMIZE_CONTROLS,
    label : CUSTOMIZE_LABEL,
    viewControls : CUSTOMIZE_VIEW_CONTROLS,
    backgroundCell : CUSTOMIZE_BACKGROUND_CELL,
    popup : CUSTOMIZE_POPUP,
    more : CUSTOMIZE_MORE,
    today : CUSTOMIZE_TODAY,
    holiday : CUSTOMIZE_HOLIDAY,
    weekend : CUSTOMIZE_WEEKEND,
    weekdays : CUSTOMIZE_WEEKDAYS,
    prevMonth : CUSTOMIZE_PREV_MONTH,
    nextMonth : CUSTOMIZE_NEXT_MONTH
};

export const WEEKEND_TYPE = {
    saturdayStyle : SATURDAY_STYLE,
    sundayStyle : SUNDAY_STYLE
};

export const PROPERTY = {
    backgroundCellStyle : BACKGROUND_CELL_STYLE,
    dateHeaderStyle : DATE_HEADER_STYLE
};