import React from 'react';
import EventBar from '../EventBarWrapper';
import { WEEK_DATA } from '../../utils/constants';
import styles from './styles.css';

const Popup = ({ popup : { events, top, left, width, height, date }, closePopup, onSelectEvent, customize }) => {

    return (
        <div className={ styles.popupBackground } onClick={ closePopup }>
            <div className={ styles.popup } onClick={ e => e.stopPropagation() } style={{ top, left, width, height }}>
                <div className={ styles.popupHeader }>
                    <span className={ styles.popupDay }>{ WEEK_DATA[date.day()] }</span>
                    <span className={ styles.popupDate }>{ date.date() }</span>
                </div>
                <div className={ styles.popupEvents }>
                    { 
                        events.map(event => (
                            <EventBar key={ event.id } event={ event } isStart={ true } 
                                isEnd={ true } onSelectEvent={ onSelectEvent } />
                        )) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Popup;