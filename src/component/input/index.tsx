import React, { useEffect, useState } from 'react';
import './module.scss';


/**
 * 使用方法:
 *  <Input size="sm" wtype='2' placeholder="small" disabled={true}/>
     size: 不设置时为默认值，可设置为sm,lg, 主要改变高度
     wtype: 宽度，不设置是为默认值，可设置为1和2，主要改变宽度和左右padding
     可添加disabled和readonly属性
 */
let ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.DOCUMENT_NODE || + RegExp['\x241']) : 0;
const Temp = (props: any) => {

    useEffect(() => {
    }, []);

    const onChange = (e: any) => {
        let value = e.target.value;
        let dataType = props.dataType;
        if (dataType === 'money') {
            if (value !== '' && !('' + value).match(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/g)) {
                return;
            }
        } else if (dataType === 'amount') {
            if (value !== '' && !('' + value).match(/^([1-9]\d*)?$/g)) {
                return;
            }
        } else if (dataType === 'discount') {
            if (value !== '' && !('' + value).match(/^(0\.\d+|[1-9][0-9]|1)$/g)) {
                return;
            }
        } else if (dataType === 'hour') {
            if (value !== '' && !('' + value).match(/((^[1-9]\d*)|^0)(\.\d{0,1}){0,1}$/g)) {
                return;
            }
        } else if (dataType === 'no') {//职能输入 数字和 英文
            if (value !== '' && !('' + value).match(/^[0-9a-zA-Z]*$/g)) {
                return;
            }
        }
        props.onChange && props.onChange(e);
    }

    const onClick = (e: any) => {
        props.onClick && props.onClick(e);
    }

    const onBlur = (e: any) => {
        props.onBlur && props.onBlur(e);
    }


    var cls = [
        'fp-form-input', props.className
    ];

    if (props.size) {
        cls.push('fp-input-' + props.size);
    }

    if (props.wtype) {
        cls.push('fp-wtype-' + props.wtype);
    }
    return (<input
        className={cls.join(' ')}
        style={props.style}
        type={props.type || 'text'}
        id={props.name}
        name={props.name}
        disabled={props.disabled}
        readOnly={props.readonly}
        onFocus={props.onFocus}
        onBlur={onBlur}
        onKeyDown={props.onKeyDown}
        onKeyPress={props.onKeyPress}
        onInput={props.onInput}
        onKeyUp={props.onKeyUp}
        onChange={onChange}
        onClick={onClick}
        placeholder={props.placeholder}
        // defaultValue={ie <= 9 ? props.placeholder : ''}
        autoComplete={props.autoComplete || 'off'}
        value={props.value}
        datatype={props.dataType}
    />);
}

export default Temp;
