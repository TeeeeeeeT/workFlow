import React, { useState, useEffect } from 'react';
import './module.scss';


/**
 * 使用方法
 * <Table data={table}/>
 * table: {
    struct: [
        { title: '手机号码', key: function(d) {
            return <a>{d.phone}</a>;
        } },
        { title: '备注', key: 'remark' },
        { title: '更新时间', key: 'time' }
    ],
    data: [
        { phone: '13111111111', remark: '123', time: '2018-01-01' },
        { phone: '13122222222', remark: '456', time: '2018-02-02' },
        { phone: '13133333333', remark: '789', time: '2018-03-03' },
        { phone: '13144444444', remark: '000', time: '2018-04-04' }
    ],
    stripe: true,
    noBorder: false
}
 * 修改了隔行背景色的样式方式，增加stripe，true表示隔行高亮
 * 增加noBorder，true表示表格无边框
 */
const Temp = (props: any) => {
    useEffect(() => {
    }, []);

    let cls = ['fp-table', 'fp-border'];
    //      let cls = ['ltable'];
    if (props.data.noBorder) {
        cls.push('fp-no-border');
    }
    if (props.className) {
        cls.push(props.className);
    }
    return (
        <table className={cls.join(' ')} style={props.style}>
            <thead>
                <tr>
                    {
                        props.data.struct.map(function (o: any, i: any) {
                            if (typeof o.title == 'function') {
                                return <th className={o.className || ''} style={{ width: o.width }} key={i}>{o.title.call(o, i)}</th>;
                            } else {
                                return <th className={o.className || ''} style={{ width: o.width }} key={i}>{o.title}</th>;
                            }
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.data.length ? props.data.data.map(function (o: any, i: any) {
                        let className;
                        if (props.data.stripe) {
                            className = i % 2 ? 'fp-stripe' : '';
                        }

                        return <tr className={className} data-index={i} key={i}>
                            {
                                props.data.struct.map(function (p: any, e: any) {
                                    if (typeof p.key == 'function') {
                                        return <td className={p.className || ''} key={e}>{p.key.call(o, i, e, p)}</td>;
                                    } else {
                                        return <td className={p.className || ''} key={e}>{o[p.key]}</td>;
                                    }
                                })
                            }
                        </tr>;
                    }) : (
                        <tr>
                            <td style={{ textAlign: 'center' }} colSpan={props.data.struct.length}>{props.emptyText || '未查询到数据'}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default Temp;
