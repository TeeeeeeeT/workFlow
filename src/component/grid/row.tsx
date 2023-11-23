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

    useEffect(() => {
    }, []);


    var gutter = props.gutter;
    var rowStyle: any = {};
    var cls = ['fp-row-wrap'];
    if (props.className) {
        cls.push(props.className);
    }

    if (gutter) {
        rowStyle['marginLeft'] = -gutter / 2;
        rowStyle['marginRight'] = -gutter / 2;
    }

    var cols = React.Children.map(props.children, function (col) {
        if (!col) {
            return null;
        }
        if (col.props && gutter) {
            var style = col.props.style || {};
            style['paddingLeft'] = gutter / 2;
            style['paddingRight'] = gutter / 2;
            return React.cloneElement(col, {
                style: style
            });
        }
        return col;
    });
    return (<div className={cls.join(' ')} style={rowStyle}>
        {cols}
    </div>);
}

export default Temp;
