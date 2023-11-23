import React, { useEffect, useState } from 'react';

import Datepicker from './index';
// var Input = require('../input');
import Row from '../grid/row';
import Col from '../grid/col';
import './module.scss';


/**
 * 使用方法：
 * <DatepickerGroup
        name='startTime'
        value={'2018-02-02'}
        more='endTime'
        moreValue={'2018-01-01'}
        wtype='2'
        size="lg"
    />
 */
const Temp = (props: any) => {

    useEffect(() => {
    }, []);


    let phs = props.placeholder ? props.placeholder.split('|') : [];
    var cls = ['fp-datePicker-group'];
    if (props.className) {
        cls.push(props.className);
    }
    return (
        <Row className={cls.join(' ')}>
            <Col span={11}>
                <Datepicker
                    ref={props.name}
                    name={props.name}
                    value={props.value}
                    // onChange={onDateChange}
                    placeholder={phs[0]}
                    size={props.size}
                    wtype={props.wtype}
                    dateFmt={props.dateFmt}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                />
            </Col>
            {
                props.more ? <Col span={1} className="fp-datepicker-text">—</Col>
                    : null
            }
            {
                props.more ? (
                    <Col span={11}><Datepicker
                        ref={props.more}
                        name={props.more}
                        value={props.moreValue}
                        // onChange={onMoreDateChange}
                        placeholder={phs[1]}
                        size={props.size}
                        wtype={props.wtype}
                        dateFmt={props.dateFmt}
                        minDate={props.moreMinDate}
                        maxDate={props.moreMaxDate}
                    /></Col>
                ) : null
            }
        </Row>
    );
}

export default Temp;
