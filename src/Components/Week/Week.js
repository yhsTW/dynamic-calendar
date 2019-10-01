import React from 'react';
import Label from '../Label';
import { WEEK_INFO } from '../../variables';
import styles from './styles.css';

const Week = () =>(
    <div className={ styles.week }>
        {
            WEEK_INFO.map(week => (
                    <Label key={ week } className={ styles.label } text={ week } />
            )) 
        }
    </div>
);

export default Week;