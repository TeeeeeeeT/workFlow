import React, { useEffect, useState } from 'react';
import './module.scss';

/**
 * 使用方法:
 *  <Row gutter={24} className="row-wrap">
        <Col span={2}><div className='col'>col-2</div></Col>
        <Col span={6} offset={2}><div className='col'>col-6</div></Col>
        <Col span={6} ><div className='col'>col-6</div></Col>
        <Col span={6} ><div className='col'>col-6</div></Col>
    </Row>
    gutter: col之间的间隔
 */
const Temp = (props: any) => {
    let [totalCols] = useState<any>(props.totalCols || 24);

    useEffect(() => {
    }, []);


    let cls = [
        'fp-col',
        'fp-col-' + (props.span || totalCols)
    ];

    if (props.className) {
        cls.push(props.className);
    }
    if (props.offset) {
        cls.push('fp-offset-' + props.offset);
    }
    return (<div className={cls.join(' ')} style={props.style}>
        {props.children}
    </div>);
}

export default Temp;
