import React, { useEffect, useState } from 'react';

import Button from '../button';
import './module.scss';


const Temp = (props: any) => {
    useEffect(() => {
    }, []);

    const onPageChange = (page: any) => {
        if (page < props.min || page > props.max) {
            return;
        }

        props.onPageChange(page);
    }

    const pages = () => {
        var i;
        var max;
        var len = props.len || 3;
        var min = props.page - Math.floor(len / 2);
        var arr = [];
        if (min + len - 1 > props.max) {
            min = props.max - len + 1;
        }

        if (min < props.min) {
            min = props.min;
        }

        for (i = min, max = min + len; i < max; i++) {
            if (i > props.max) {
                break;
            }

            arr.push(i);
        }

        return arr;
    }

    // var hasPrev = props.page <= props.min;
    // var hasNext = props.page >= props.max;
    var cls = ['fp-items'];
    if (props.btnSize) {
        cls.push('fp-items-' + props.btnSize);
    }
    return (<ul className={cls.join(' ')}>
        <li>
            <Button
                className='fp-page-control fp-prev'
                style="default"
                size={props.btnSize || ''}
                disabled={props.page <= props.min}
                onClick={() => { onPageChange(props.page - 1) }}
            />
        </li>
        {
            pages().map(function (page: any, i: any) {
                var cls = [];
                if (page == props.page) {
                    cls.push('fp-page-active');
                }

                return (
                    <li className={cls.join(' ')} key={i}>
                        <Button
                            className='fp-item'
                            style="default"
                            text={page}
                            size={props.btnSize || ''}
                            onClick={() => { onPageChange(page) }}
                        />
                    </li>
                );
            }.bind(this))
        }
        <li>
            <Button
                className='fp-page-control fp-next'
                style="default"
                size={props.btnSize || ''}
                disabled={props.page >= props.max}
                onClick={() => { onPageChange(props.page + 1) }}
            />
        </li>
    </ul>);
}

export default Temp;
