import React from 'react';
import ReactDOM from 'react-dom';
import DynamicCalendar from './Components/DynamicCalendar';
import './global.css';

// ReactDOM.render(<DynamicCalendar />, document.getElementById('root'));
ReactDOM.render(<DynamicCalendar customize={{ View : { BackgroundCell : { useBorder : true, borderStyle : { border : '1px solid #DDD'} } } }} />, document.getElementById('root'));