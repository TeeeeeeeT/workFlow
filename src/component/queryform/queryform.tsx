import React, { useEffect, useState } from 'react';
import Row from '../grid/row';
import Col from '../grid/col';
import FormItem from './formItem';
import Button from '../button/index';
import './module.scss';

const Temp = (props: any) => {
    useEffect(() => {
    }, []);


    var groups = props.groups;
    var cls = ['fp-query-form'];
    if (props.className) {
        cls.push(props.className);
    }

    if (!props.groups) {
        console.error('groups is undefined');
        return null;
    }

    var totalSpan = 0;
    var len = groups.length;
    var itemSpan = 0;
    groups[len - 1].map(function (item: any, index: any) {
        itemSpan = item.span ? item.span : (24 / props.col || 8);
        totalSpan += itemSpan;
    });
    return (<div className={cls.join(' ')}>
        <form onSubmit={props.onSubmit}>
            <fieldset>
                {
                    groups.map(function (row: any, index: any) {
                        return <Row gutter={props.gutter || 0} className='fp-query-row' key={index}>
                            {
                                row.map(function (item: any, index2: any) {
                                    return <Col span={item.span ? item.span : (24 / props.col || 8)} key={index2}>
                                        <FormItem data={item} />
                                    </Col>;
                                })
                            }
                            {
                                totalSpan < 24 && index == groups.length - 1 ?
                                    <div className="fp-query-btn-warp">
                                        {
                                            <Button text='查 询'
                                                style='primary'
                                                type="submit"
                                                className='fp-query-btn' />
                                        }
                                        {
                                            <Button text='重置'
                                                style='default'
                                                className='fp-query-btn'
                                                onClick={props.onReset} />
                                        }
                                    </div>
                                    : null
                            }
                        </Row>;
                    })
                }

                {
                    totalSpan >= 24 ?
                        <div className="fp-query-btn-warp">
                            {
                                <Button text='查 询'
                                    style='primary'
                                    type="submit"
                                    className='fp-query-btn' />
                            }
                            {
                                <Button text='重置'
                                    style='default'
                                    className='fp-query-btn'
                                    onClick={props.onReset} />
                            }
                        </div>
                        : null
                }
            </fieldset>
        </form>

    </div>);
}

export default Temp;
