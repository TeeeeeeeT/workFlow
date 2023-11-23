import React, { useEffect, useState } from 'react';

import Input  from './index';
var Row = require('../grid/row');
var Col = require('../grid/col');
import './module.scss';


const Temp = (props: any) => {
    let [totalCols] = useState<any>(props.totalCols || 24);

    useEffect(() => {
    }, []);

    const onChange = (value:any) =>{
        props.onChange && props.onChange(value);
    }

    const onMoreChange = (value:any) =>{
        props.onMoreChange && props.onMoreChange(value);
    }

    var phs = props.placeholder ? props.placeholder.split('|') : [];
    return (<Row className='fp-input-group'>
        <Col span={11}>
            <Input
                // ref={props.name}
                name={props.name}
                value={props.value}
                onChange={onChange}
                placeholder={phs[0]}
                size={props.size}
                wtype={props.wtype}
                dataType={props.dataType}
            />
        </Col>
        {
            props.more ? (
                <Col span={1} className='fp-input-more-text'>—</Col>
            ) : null
        }
        {
            props.more ? (
                <Col span={11}>
                    <Input
                        // ref={props.more}
                        name={props.more}
                        value={props.moreValue}
                        onChange={onMoreChange}
                        placeholder={phs[1]}
                        size={props.size}
                        wtype={props.wtype}
                        dataType={props.moreDataType}
                    />
                </Col>
            ) : null
        }
    </Row>);
}

export default Temp;
