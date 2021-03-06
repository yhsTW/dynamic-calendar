import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from '../Header';
import View from '../View';
import { VIEW_TYPE, COMPONENT_NAMES, CONTROLS_TYPE, POSITION, FORMAT } from '../../utils/constants';
//////////////////////////////////// 테스트용 ////////////////////////////////////
import { events } from '../../events';
//////////////////////////////////// 테스트용 ////////////////////////////////////
import styles from './styles.css';
import { makeEventGroup } from '../../utils/makeEventGroup';
import { CustomizeProvider } from '../../contexts/customize';
//////////////////////////////////// 테스트용 ////////////////////////////////////
import HeaderTest from '../../HeaderTest';
//////////////////////////////////// 테스트용 ////////////////////////////////////

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
        const { onNavigate } = this.props;

        this.setState({
            currentDate : date
        });
        onNavigate(date);
    };
    
    // 사용자가 보고있는 달력 타입을 변경한다.
    updateCurrentView = view => {
        this.setState({
            currentView : view
        });
    };

    // 사용자로부터 받은 이벤트를 그룹별로 묶는다.
    settingEvents = () => {
        const { events } = this.props;
        const { currentDate } = this.state;

        return makeEventGroup(events, currentDate);
    };

    render() {
        const { 
            views, onSelectSlot, onSelectEvent, useHeader, customize,
            popup, selectable, useExtend, components
        } = this.props;
        const { currentDate, currentView } = this.state;
        const events = this.settingEvents();
        const HeaderComponent = (components && components.header) || Header;
        
        return (
            <CustomizeProvider value={ customize }>
                <div className={ styles.dynamicCalendar }>
                    { 
                        useHeader && (
                            <HeaderComponent today={ TODAY } currentDate={ currentDate } views={ views }
                                currentView={ currentView } updateCurrentDate={ this.updateCurrentDate }
                                updateCurrentView={ this.updateCurrentView } />
                        )
                    }
                    <View today={ TODAY } currentDate={ currentDate } currentView={ currentView } views={ views }
                        events={ events } onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent }
                        popup={ popup } updateCurrentDate={ this.updateCurrentDate } updateCurrentView={ this.updateCurrentView }
                        selectable={ selectable } useExtend={ useExtend } components={ components } />
                </div>
            </CustomizeProvider>
        );
    };
}

///////////////////// 테스트용 /////////////////////
const testEventBarMap = new Map();
testEventBarMap.set('ddd', HeaderTest);
///////////////////// 테스트용 /////////////////////

DynamicCalendar.defaultProps = {
    // events : [],
    ///////////////////// 테스트용 /////////////////////
    events,
    ///////////////////// 테스트용 /////////////////////
    date : TODAY,
    min : null,
    max : null,
    defaultView : VIEW_TYPE.month,
    views : [VIEW_TYPE.month, VIEW_TYPE.week, VIEW_TYPE.day],
    ///////////////////// 테스트용 /////////////////////
    // components : {
    //     eventBar : {
    //         components : testEventBarMap,
    //         key : 'type'
    //     }
    //     // eventBar : HeaderTest
    // },
    ///////////////////// 테스트용 /////////////////////
    components : null,
    // selectable : false,
    // popup : false,
    ///////////////////// 테스트용 /////////////////////
    selectable : true,
    popup : true,
    ///////////////////// 테스트용 /////////////////////
    useHeader : true,
    // useExtend : false,
    ///////////////////// 테스트용 /////////////////////
    useExtend : true,
    ///////////////////// 테스트용 /////////////////////
    customize : {
        Header : {
            order : [
                COMPONENT_NAMES.controls,
                COMPONENT_NAMES.label,
                COMPONENT_NAMES.viewControls
            ],
            style : {},
            Controls : {
                order : [
                    CONTROLS_TYPE.today,
                    CONTROLS_TYPE.prev,
                    CONTROLS_TYPE.next
                ],
                prevContent : '<',
                todayContent : '오늘',
                nextContent : '>',
                controlsStyle : {},
                controlStyle : {}
            },
            Label : {
                format : FORMAT,
                style : {}
            },
            ViewControls : {
                viewControlsStyle : {},
                viewControlStyle : {}
            }
        },
        View : {
            BackgroundCell : {
                useBorder : false,
                borderStyle : {},
                selectStyle : {
                    backgroundColor: '#EEEEEE'
                }
            },
            Popup : {},
            More : {
                prefix : '+',
                suffix : ' more',
                moreStyle : {},
                position : {
                    alignItems : 'flex-start',
                    justifyContent : 'flex-end'
                }
            },
            today : {
                dateHeaderStyle : {
                    backgroundColor : '#F8613B',
                    borderRadius : '13px',
                    padding : '3px 10px',
                    color : '#FFF'
                },
                backgroundCellStyle : {}
            },
            holiday : {
                dateHeaderStyle : {},
                backgroundCellStyle : {}
            },
            weekend : {
                dateHeaderStyle : {
                    saturdayStyle : {},
                    sundayStyle : {
                        color : '#F76767'
                    }
                },
                backgroundCellStyle : {
                    saturdayStyle : {},
                    sundayStyle : {}
                }
            },
            weekdays : {
                dateHeaderStyle : {},
                backgroundCellStyle : {}
            },
            prevMonth : {
                dateHeaderStyle : {
                    opacity : 0.3
                },
                backgroundCellStyle : {
                    backgroundColor : '#EEEEEE'
                }
            },
            nextMonth : {
                dateHeaderStyle : {
                    opacity : 0.3
                },
                backgroundCellStyle : {
                    backgroundColor : '#EEEEEE'
                }
            }
        }
    },
    // onNavigate : () => {},
    // onSelectSlot : () => {},
    // onSelectEvent : () => {}
    ///////////////////// 테스트용 /////////////////////
    onNavigate : date => console.log('onNavigate date : ', date),
    onSelectSlot : data => console.log('onSelectSlot data : ', data),
    onSelectEvent : event => console.log('onSelectEvent event : ', event)
    ///////////////////// 테스트용 /////////////////////
};

DynamicCalendar.propTypes = {
    // 달력에 표시할 일정들
    events : PropTypes.arrayOf(
        PropTypes.shape(
            {
                id : PropTypes.number.isRequired,
                title : PropTypes.string.isRequired,
                start : PropTypes.instanceOf(Date).isRequired,
                end : PropTypes.instanceOf(Date).isRequired,
                color : PropTypes.string,
                allDay : PropTypes.bool
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
    min : PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
        PropTypes.instanceOf(moment)
    ]),
    // 이동할 수 있는 최대 날짜
    max : PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
        PropTypes.instanceOf(moment)
    ]),
    // 달력 첫 화면에 보여 줄 달력 타입
    defaultView : PropTypes.oneOf([
        VIEW_TYPE.month,
        VIEW_TYPE.week,
        VIEW_TYPE.day
    ]),
    // 달력 타입 모음
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    components : PropTypes.shape({
        header : PropTypes.elementType,
        dateSlot : PropTypes.elementType,
        eventBar : PropTypes.oneOfType([PropTypes.elementType, PropTypes.shape({
            components : PropTypes.instanceOf(Map).isRequired,
            key : PropTypes.string.isRequired
        })]),
        popup : PropTypes.elementType
    }),
    // defaultWidth : PropTypes.string,
    // defaultHeight : PropTypes.string,
    // Slot 선택 여부. false일 경우에 onSelectSlot이 실행되지 않는다.
    selectable : PropTypes.bool,
    // 팝업 사용 여부. 이것이 false일 경우, 더보기 버튼을 누르면 일간 일정으로 이동한다.
    popup : PropTypes.bool,
    useHeader : PropTypes.bool,
    useExtend : PropTypes.bool,
    customize : PropTypes.shape({
        Header : PropTypes.shape({
            order : PropTypes.arrayOf(
                PropTypes.oneOf([
                    COMPONENT_NAMES.controls,
                    COMPONENT_NAMES.label,
                    COMPONENT_NAMES.viewControls
                ])
            ),
            style : PropTypes.object,
            Controls : PropTypes.shape({
                order : PropTypes.arrayOf(
                    PropTypes.oneOf([CONTROLS_TYPE.today,
                        CONTROLS_TYPE.prev,
                        CONTROLS_TYPE.next
                    ])
                ),
                prevContent : PropTypes.string,
                todayContent : PropTypes.string,
                nextContent : PropTypes.string,
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
        }),
        View : PropTypes.shape({
            BackgroundCell : PropTypes.shape({
                useBorder : PropTypes.bool,
                borderStyle : PropTypes.object,
                selectStyle : PropTypes.object
            }),
            Popup : PropTypes.shape({}),
            More : PropTypes.shape({
                prefix : PropTypes.string,
                suffix : PropTypes.string,
                moreStyle : PropTypes.object,
                position : PropTypes.shape({
                    alignItems : PropTypes.string,
                    justifyContent : PropTypes.string
                })
            }),
            today : PropTypes.shape({
                dateHeaderStyle : PropTypes.object,
                backgroundCellStyle : PropTypes.object
            }),
            holiday : PropTypes.shape({
                dateHeaderStyle : PropTypes.object,
                backgroundCellStyle : PropTypes.object
            }),
            weekend : PropTypes.shape({
                saturdayStyle : PropTypes.object,
                sundayStyle : PropTypes.object
            }),
            weekdays : PropTypes.shape({
                dateHeaderStyle : PropTypes.object,
                backgroundCellStyle : PropTypes.object
            }),
            prevMonth : PropTypes.shape({
                dateHeaderStyle : PropTypes.object,
                backgroundCellStyle : PropTypes.object
            }),
            nextMonth : PropTypes.shape({
                dateHeaderStyle : PropTypes.object,
                backgroundCellStyle : PropTypes.object
            })
        })
    }),
    // 현재 보고 있는 날짜가 변경되면 실행된다.
    onNavigate : PropTypes.func,
    // 달력의 Slot을 누르면 발생하는 이벤트
    onSelectSlot : PropTypes.func,
    // 달력의 event를 클릭하면 발생하는 이벤트
    onSelectEvent : PropTypes.func
};

export default DynamicCalendar;