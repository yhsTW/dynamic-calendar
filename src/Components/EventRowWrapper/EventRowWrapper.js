import React, { Fragment, Component } from 'react';
import eventLevel from '../../utils/eventLevel';
import { VIEW_TYPE } from '../../utils/constants';
import { arrayCheck, variablesCheck } from '../../utils/changeCheck';
import EventRow from '../EventRow';

class EventRowWrapper extends Component {
    prevEvents = [];
    prevSameEvents = [];

    shouldComponentUpdate = (nextProps) => {
        const { events, limit, isSelecting } = this.props;
        const checkEvents = !this.differenceEvents(events, nextProps.events);
        const checkLimit = !variablesCheck(limit, nextProps.limit);
        const checkIsSelecting = !variablesCheck(isSelecting, nextProps.isSelecting);
        
        return checkEvents || checkLimit || checkIsSelecting;
    };

    differenceEvents = (prevEvents, currentEvents) => {
        return (prevEvents.length !== currentEvents.length || !arrayCheck(prevEvents, currentEvents));
    };

    getEventRowHeight = () => {
        return (this.eventRowRef && this.eventRowRef.clientHeight) ? this.eventRowRef.clientHeight : 0;
    };

    getSameEvents = () => {
        const { slotStart, slotEnd, events, eventProperty } = this.props;
        let sameEvents = events ? this.prevSameEvents : [];

        if(events && this.differenceEvents(this.prevEvents, events)) {
            sameEvents = eventLevel(slotStart, slotEnd, events, eventProperty);

            this.prevEvents = events;
            this.prevSameEvents = sameEvents;
        }

        return sameEvents;
    };

    render() {
        const {
            slotStart, slotEnd, onSelectEvent, isSelecting,
            startSelecting, currentView, components, eventProperty,
            limit
        } = this.props;
        const sameEvents = this.getSameEvents();
        
        return (
            <Fragment>
                {
                    sameEvents.map((events, idx) => {
                        if(currentView !== VIEW_TYPE.month || (limit === 0 || idx < limit)) {
                            return (
                                <EventRow key={ events[0][eventProperty.id] } eventRowRef={ ref => this.eventRowRef = ref }
                                    events={ events } slotStart={ slotStart } slotEnd={ slotEnd } onSelectEvent={ onSelectEvent }
                                    isSelecting={ isSelecting } startSelecting={ startSelecting } currentView={ currentView }
                                    components={ components } eventProperty={ eventProperty } />
                            )
                        }
                    })
                }
            </Fragment>
        );
    };
};

export default EventRowWrapper;