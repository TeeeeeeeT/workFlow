import React, { useEffect, useState } from 'react';

import Input from '../input';
import './module.scss';


/**
 * 使用方法：
 * <Datepicker name="time"
    wtype="2"
    size='lg'
    value='2018-04-11 20:0:00'
    dateFmt={'yyyy-MM-dd HH:mm:ss'}
    onChange={this.dateChange}/>
 */
const Temp = (props: any) => {

    useEffect(() => {
    }, []);

    const datePicker = (e: any) => {
        // if (this.props.disabled) {
        //     return;
        // }

        // var _this = this;
        // setTimeout(function() {
        //     window.WdatePicker({
        //         skin: 'twoer',
        //         el: _this.refs[_this.props.name].getTarget(),
        //         dateFmt: _this.props.dateFmt || 'yyyy-MM-dd',
        //         hmsMenuCfg: _this.props.hmsMenuCfg || undefined,
        //         onpicked: function(datePicker) {
        //             var value = datePicker.el.value;
        //             _this.props.onChange && _this.props.onChange(value);
        //         },
        //         oncleared: function(datePicker) {
        //             _this.props.onChange && _this.props.onChange();
        //         },
        //         maxDate: _this.props.maxDate || '',
        //         minDate: _this.props.minDate || '',
        //         minTime: _this.props.minTime || undefined,
        //         maxTime: _this.props.maxTime || undefined,
        //         mchanging: _this.props.mchanging || undefined,
        //         disabledDates: _this.props.disabledDates || []
        //     });
        // }, 0);
    }

    const clickIcon = () => {
        // datePicker();
    }

    let cls = ['fp-datepicker', props.className];
    if (props.size) {
        cls.push('fp-datepicker-' + props.size);
    }
    return (
        <div className={cls.join(' ')}>
            <Input
                ref={props.name}
                name={props.name}
                value={props.value}
                onClick={datePicker}
                // onKeyUp={valueChange}
                placeholder={props.placeholder}
                size={props.size}
                wtype={props.wtype}
                autoComplete="off"
                disabled={props.disabled}
                readonly={props.readonly}
            />
            <i onClick={clickIcon}></i>
        </div>
    );
}

export default Temp;
