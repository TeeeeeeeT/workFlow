import React, { useEffect, useState } from 'react';

import Items from './items';
import Form from './form';
import './module.scss';

/**
 * 使用方法：
 * <Pagination page={this.state.currentPage}
        size={10}
        len={3}
        total={51}
        btnSize='sm'
        onPageChange={this.onPageChange}
    />
 *
 * page: 当前页
 * size: 每页数据总数
 * total: 数据总量
 * btnSize: 不设置时为default，可设置为sm, lg, 影响高度
 * onPageChange: 点击翻页的回调函数
 */
const Temp = (props: any) => {


    useEffect(() => {
    }, []);

    const onPageChange = (page: any) => {
        props.onPageChange && props.onPageChange(page);
    }

    if (props.total === undefined) {
        window.console.error('total count is undefined');
        return null;
    }

    var cls = ['fp-pagination', props.className];
    var min = 1;
    var max = Math.ceil(props.total / props.size);
    return (<div className={cls.join(' ')}>
        <Items
            page={props.page}
            size={props.size}
            min={min}
            max={max}
            len={props.len}
            btnSize={props.btnSize}
            onPageChange={onPageChange}
        />
        <Form
            page={props.page}
            size={props.size}
            min={min}
            max={max}
            btnSize={props.btnSize}
            total={props.total}
            onPageChange={onPageChange}
        />
    </div>);
}

export default Temp;
