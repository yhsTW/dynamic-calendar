import React, { Fragment, Component } from 'react';
import _ from 'lodash';
import eventLevel from '../../utils/eventLevel';
import { VIEW_TYPE } from '../../utils/constants';
import EventRow from '../EventRow';

class EventRowWrapper extends Component {
    prevEvents = [];
    prevSameEvents = [];

    shouldComponentUpdate = (nextProps) => {
        return this.differenceEvents(this.props.events, nextProps.events) || this.props.limit !== nextProps.limit;
    };

    differenceEvents = (prevEvents, currentEvents) => {
        return (prevEvents.length !== currentEvents.length || _.isEqual(prevEvents, currentEvents).length > 0);
    };

    getEventRowHeight = () => {
        return (this.eventRowRef && this.eventRowRef.clientHeight) ? this.eventRowRef.clientHeight : 0;
    };

    getSameEvents = () => {
        const { slotStart, slotEnd, events, eventProperty } = this.props;
        let sameEvents = events ? this.prevSameEvents : [];

        if(events && this.prevEvents && this.differenceEvents(this.prevEvents, events)) {
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