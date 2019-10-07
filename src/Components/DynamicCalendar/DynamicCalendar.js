import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from '../Header';
import View from '../View';
import { MONTH, WEEK, DAY, COMPONENT_NAMES, CONTROLS_TYPE, POSITION, FORMAT } from '../../variables';
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
        const { 
            views, onSelectSlot, onSelectEvent, useHeader, 
            customize : { Header : customizeHeader, View : customizeView }
        } = this.props;
        const { currentDate, currentView } = this.state;

        return (
            <div className={ styles.dynamicCalendar }>
                { 
                    useHeader && (
                        <Header today={ TODAY } currentDate={ currentDate } views={ views }
                            currentView={ currentView } updateCurrentDate={ this.updateCurrentDate } updateCurrentView={ this.updateCurrentView }
                            customizeHeader={ customizeHeader }  />
                    )
                }
                <View today={ TODAY } currentDate={ currentDate } currentView={ currentView } 
                    events={ events } onSelectSlot={ onSelectSlot } onSelectEvent={ onSelectEvent }
                    customizeView={ customizeView } />
            </div>
        );
    };
}

DynamicCalendar.defaultProps = {
    // events : [],
    ///////////////////// 테스트용 /////////////////////
    events,
    ///////////////////// 테스트용 /////////////////////
    date : TODAY,
    min : null,
    max : null,
    defaultView : MONTH,
    views : [MONTH],
    components : null,
    selectable : false,
    popup : false,
    useHeader : true,
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
                    backgroundColor: '#DDD',
                    opacity: 0.3,
                }
            },
            Popup : {},
            More : {
                numFrontText : '+',
                numBackText : ' more',
                moreStyle : {},
                position : [
                    POSITION.top,
                    POSITION.right
                ]
            },
            today : {
                dateHeaderStyle : {},
                backgroundCellStyle : {}
            },
            holiday : {
                dateHeaderStyle : {},
                backgroundCellStyle : {}
            },
            weekend : {
                dateHeaderStyle : {
                    saturdayStyle : {},
                    sundayStyle : {}
                },
                backgroundCellStyle : {
                    saturdayStyle : {},
                    sundayStyle : {}
                }
            },
            weekdays : {
                dateHeaderStyle : {},
                backgroundCellStyle : {}
            }
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
        MONTH,
        WEEK,
        DAY
    ]),
    // 달력 타입 모음
    views : PropTypes.arrayOf(PropTypes.string.isRequired),
    components : PropTypes.object,
    // defaultWidth : PropTypes.string,
    // defaultHeight : PropTypes.string,
    // Slot 선택 여부. false일 경우에 onSelectSlot이 실행되지 않는다.
    selectable : PropTypes.bool,
    // 팝업 사용 여부. 이것이 false일 경우, 더보기 버튼을 누르면 일간 일정으로 이동한다.
    popup : PropTypes.bool,
    useHeader : PropTypes.bool,
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
                numFrontText : PropTypes.string,
                numBackText : PropTypes.string,
                moreStyle : PropTypes.object,
                position : PropTypes.arrayOf(
                    PropTypes.oneOf([
                        POSITION.top,
                        POSITION.right,
                        POSITION.bottom,
                        POSITION.left,
                        POSITION.center
                    ])
                )
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
            })
        })
    }),
    // 현재 보고 있는 날짜가 변경되면 실행된다.
    onMoveMonth : PropTypes.func,
    // 달력의 Slot을 누르면 발생하는 이벤트
    onSelectSlot : PropTypes.func,
    // 달력의 event를 클릭하면 발생하는 이벤트
    onSelectEvent : PropTypes.func
};

export default DynamicCalendar;