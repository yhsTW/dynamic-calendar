import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from '../Header';
import Body from '../View';
import { MONTH, WEEK, DAY, COMPONENT_NAMES, CONTROLS_TYPE } from '../../variables';
//////////////////////////////////// 테스트용 ////////////////////////////////////
import { events } from '../../events';
//////////////////////////////////// 테스트용 ////////////////////////////////////
import styles from './styles.css';

const TODAY = moment();

class DynamicCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate : moment(this.props.date),
            currentView : this.props.defaultView
        };
    };

    // 현재 사용자가 보고있는 날짜를 변경한다.
    updateCurrentDate = date => {
        this.setState({
            currentDate : date
        });
    };
    
    // 사용자가 보고있는 달력 타입을 변경한다.
    updateCurrentView = view => {
        this.setState({
            currentView : view
        });
    };

    render() {
        // const { views, events, onSelectSlot, onSelectEvent } = this.props;
        const { views, onSelectSlot, onSelectEvent } = this.props;
        const { currentDate, currentView } = this.state;

        return (
            <div className={ styles.dynamicCalendar }>
                <Header today={ TODAY } currentDate={ currentDate } views={ views }
                    currentView={ currentView } updateCurrentDate={ this.updateCurrentDate } updateCurrentView={ this.updateCurrentView }  />
                <Body today={ TODAY } currentDate={ currentDate } currentView={ currentView } events={ events } onSelectSlot={ onSelectSlot }
                    onSelectEvent={ onSelectEvent } />
            </div>
        );
    };
}

DynamicCalendar.defaultProps = {
    events : [],
    date : TODAY,
    min : null,
    max : null,
    defaultView : MONTH,
    views : [MONTH],
    components : null,
    selectable : false,
    popup : false,
    customize : {
        Header : {
            order : [COMPONENT_NAMES.controls, COMPONENT_NAMES.label, COMPONENT_NAMES.views],
            style : {}
        },
        Controls : {
            order : [CONTROLS_TYPE.today, CONTROLS_TYPE.prev, CONTROLS_TYPE.next],
            controlsStyle : {},
            controlStyle : {}
        },
        Label : {
            format : 'YYYY년 MM월',
            style : {}
        },
        ViewControls : {
            viewControlsStyle : {},
            viewControlStyle : {}
        }
    },
    onSelectSlot : () => {},
    onSelectEvent : () => {}
};

DynamicCalendar.propTypes = {
    // 달력에 표시할 일정들
    events : PropTypes.arrayOf(
        PropTypes.shape(
            {
                id : PropTypes.number.isRequired,
                title : PropTypes.string.isRequired,
                start : PropTypes.instanceOf(Date).isRequired,
                end : PropTypes.instanceOf(Date).isRequired
            }
        )
    ),
    // 기준이 되는 날짜
    date : PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
        PropTypes.instanceOf(moment)
    ]),
    // 이동할 수 있는 최소 날짜
    min : PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.instanceOf(moment)]),
    // 이동할 수 있는 최대 날짜
    max : PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.instanceOf(moment)]),
    // 달력 첫 화면에 보여 줄 달력 타입
    defaultView : PropTypes.oneOf([MONTH, WEEK, DAY]),
    // 달력 타입 모음
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    components : PropTypes.object,
    // defaultWidth : PropTypes.string,
    // defaultHeight : PropTypes.string,
    // Slot 선택 여부. false일 경우에 onSelectSlot이 실행되지 않는다.
    selectable : PropTypes.bool,
    // 현재 보고 있는 날짜가 변경되면 실행된다.
    onMoveMonth : PropTypes.func,
    // 달력의 Slot을 누르면 발생하는 이벤트
    onSelectSlot : PropTypes.func,
    // 달력의 event를 클릭하면 발생하는 이벤트
    onSelectEvent : PropTypes.func,
    // 팝업 사용 여부. 이것이 false일 경우, 더보기 버튼을 누르면 일간 일정으로 이동한다.
    popup : PropTypes.bool,
    customize : PropTypes.shape({
        Header : PropTypes.shape({
            order : PropTypes.arrayOf(PropTypes.oneOf([COMPONENT_NAMES.controls, COMPONENT_NAMES.label, COMPONENT_NAMES.views])),
            style : PropTypes.object
        }),
        Controls : PropTypes.shape({
            order : PropTypes.arrayOf(PropTypes.oneOf([CONTROLS_TYPE.today, CONTROLS_TYPE.prev, CONTROLS_TYPE.next])),
            controlsStyle : PropTypes.object,
            controlStyle : PropTypes.object
        }),
        Label : PropTypes.shape({
            format : PropTypes.string,
            style : PropTypes.object
        }),
        ViewControls : PropTypes.shape({
            viewControlsStyle : PropTypes.object,
            viewControlStyle : PropTypes.object
        })
    })
};

export default DynamicCalendar;