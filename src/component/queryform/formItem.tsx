import React, { useEffect, useState } from 'react';
import './module.scss';
import Input from '../input/index';
import InputGroup from '../input/group';
import Select from '../select/index';
import Datepicker from '../datepicker/index';
import DatepickerGroup from '../datepicker/group';
import Row from '../grid/row';
import Col from '../grid/col';
import areaResetIcon from './reset-icon.png';


import './module.scss';

const Temp = (props: any) => {
    let types = [
        'Datepicker',
        'Select',
        'TextInput',
        'DivNode'
    ];
    let defaultLabelSpan = 8;

    useEffect(() => {
    }, []);

    const inArray = (val: any, arr: any) => {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (val.toString() == arr[i].toString()) {
                return true;
            }
        }
        return false;
    }

    const renderLabel = () => {
        if (!props.data.label) {
            return null;
        }

        return (
            <label
                className='fp-control-label'
                htmlFor={props.data.name}
            >
                {props.data.label}
            </label>
        );
    }

    const renderTextInput = () => {
        var data = props.data;
        data.labelSpan = data.labelSpan !== undefined ? data.labelSpan : defaultLabelSpan;
        if (data.more) {
            return (
                <Row className={data.className}>
                    <Col span={data.labelSpan} className='fp-query-label-col'>
                        {renderLabel()}
                    </Col>
                    <Col span={24 - data.labelSpan}>
                        <InputGroup
                            name={data.name}
                            value={data.value || ""}
                            more={data.more}
                            moreValue={data.moreValue}
                            placeholder={data.placeholder}
                            options={data.options}
                            size={data.size}
                            wtype={data.wtype}
                            dateFmt={data.dateFmt}
                            onChange={data.onChange}
                            onMoreChange={data.onMoreChange}
                            dataType={data.dataType}
                            moreDataType={data.moreDataType}
                        />
                    </Col>
                </Row>
            );
        }
        return (
            <Row className={data.className}>
                <Col span={data.labelSpan} className='fp-query-label-col'>
                    {renderLabel()}
                </Col>
                <Col span={24 - data.labelSpan}>
                    <Input
                        className='fp-query-input'
                        name={data.name}
                        value={data.value || ""}
                        disabled={data.disabled}
                        readonly={data.readonly}
                        onFocus={data.onFocus}
                        onBlur={data.onBlur}
                        onKeyDown={data.onKeyDown}
                        onKeyPress={data.onKeyPress}
                        onInput={data.onInput}
                        onKeyUp={data.onKeyUp}
                        onChange={data.onChange}
                        placeholder={data.placeholder}
                        size={data.size}
                        wtype={data.wtype}
                        dataType={data.dataType}
                    />
                </Col>
            </Row>
        );
    }

    const renderDivNode = () => {
        var data = props.data;
        data.labelSpan = data.labelSpan !== undefined ? data.labelSpan : defaultLabelSpan;
        return <Row className={data.className}>
            <Col span={data.labelSpan} className='fp-query-label-col '>
                {renderLabel()}
            </Col>
            <Col span={24 - data.labelSpan} className='area-input'>
                <div className='fp-query-div-node' onClick={data.onClick}>
                    {data.value}
                </div>
                {
                    (data.value !== undefined && data.value !== '' && data.reset !== undefined) ? <img src={areaResetIcon} className="area-reset" onClick={data.reset} /> : null
                }
            </Col>
        </Row>;
    }

    const renderSelect = () => {
        var data = props.data;
        data.labelSpan = data.labelSpan !== undefined ? data.labelSpan : defaultLabelSpan;
        return (
            <Row className={data.className}>
                <Col span={data.labelSpan} className='fp-query-label-col'>
                    {renderLabel()}
                </Col>
                <Col span={24 - data.labelSpan}>
                    <Select
                        className='fp-query-select'
                        name={data.name}
                        value={data.value}
                        options={data.options}
                        onChange={data.onChange}
                        onFocus={data.onFocus}
                        onBlur={data.onBlur}
                        disabled={data.disabled}
                        readonly={data.readonly}
                        size={data.size}
                        wtype={data.wtype}
                        keyMap={data.keyMap}
                        filterable={data.filterable}
                    />
                </Col>
            </Row>
        );
    }

    const renderDatepicker = () => {
        var data = props.data;
        data.labelSpan = data.labelSpan !== undefined ? data.labelSpan : defaultLabelSpan;
        if (data.more) {
            return (
                <Row className={data.className}>
                    <Col span={data.labelSpan} className='fp-query-label-col'>
                        {renderLabel()}
                    </Col>
                    <Col span={24 - data.labelSpan}>
                        <DatepickerGroup
                            name={data.name}
                            value={data.value}
                            more={data.more}
                            moreValue={data.moreValue}
                            onChange={data.onChange}
                            onMoreChange={data.onMoreChange}
                            placeholder={data.placeholder}
                            options={data.options}
                            size={data.size}
                            wtype={data.wtype}
                            dateFmt={data.dateFmt}
                            minDate={data.minDate}
                            maxDate={data.maxDate}
                            moreMinDate={data.moreMinDate}
                            moreMaxDate={data.moreMaxDate}
                        />
                    </Col>
                </Row>
            );
        }

        return (
            <Row className={data.className}>
                <Col span={data.labelSpan} className='fp-query-label-col'>
                    {renderLabel()}
                </Col>
                <Col span={24 - data.labelSpan}>
                    <Datepicker
                        className='fp-query-datepicker'
                        name={data.name}
                        value={data.value}
                        onChange={data.onChange}
                        placeholder={data.placeholder}
                        size={data.size}
                        wtype={data.wtype}
                        dateFmt={data.dateFmt}
                        minDate={data.minDate}
                        maxDate={data.maxDate}
                    />
                </Col>
            </Row>
        );
    }

    const toCall =(type:any)=>{

        if(type == 'renderLabel'){
            return renderLabel();
        }
        else if(type == 'renderTextInput'){
            return renderTextInput();
        }
        // else if(type == 'renderDivNode'){
        //     return renderDivNode();
        // }
        // else if(type == 'renderSelect'){
        //     return renderSelect();
        // }
        // else if(type == 'renderDatepicker'){
        //     return renderDatepicker();
        // }
    }

    if (!props.data || !props.data.type
        || !inArray(props.data.type, types)) {
        return null;
    }
    return (
        // 'render' + props.data.type()
        toCall('render' + props.data.type)
    );
}

export default Temp;
