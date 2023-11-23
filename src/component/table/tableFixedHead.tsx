import React, { useState, useEffect } from 'react';
import './module.scss';

/**
 * <TableFixedHead data={this.state.table} initHeight={200}/>
 * table: {
    struct: [
        { title: '手机号码', key: function(d) {
            return <a>{d.phone}</a>;
        }, width: 200 },            // 一定要给宽度，否则不对齐
        { title: '备注', key: 'remark', width: 200 },  
        { title: '更新时间', key: 'time' }
    ],
    data: [
        { phone: '13111111111', remark: '123', time: '2018-01-01' },
        { phone: '13122222222', remark: '456', time: '2018-02-02' },
        { phone: '13133333333', remark: '789', time: '2018-03-03' },
        { phone: '13144444444', remark: '000', time: '2018-04-04' }
    ],
    stripe: true
 *
 * 注：列的宽度和不能大于表格的宽度，最后一列可以不设置宽度
 */
const Temp = (props: any) => {
    let [leftShadow] = useState<any>();
    let [rightShadow] = useState<any>();

    useEffect(() => {

    }, []);


    let cls = ['fp-table-fixed-head'];
    let data = props.data;
    let rowStyle = props.rowStyle;
    let style = {};
    let colGroups: any = [];
    data.struct.map((o: any, i: any) => {
        colGroups.push(<col width={o.width || props.minWidth}></col>);
    });
    return (
        <div className={cls.join(' ')} style={props.style || {}}>
            <table className='fp-table fp-head-table'>
                <colgroup>{colGroups}</colgroup>
                <thead>
                    <tr style={rowStyle && rowStyle[0] ? rowStyle[0] : {}}>
                        {
                            data.struct.map((o: any, i: any) => {
                                return <th className={o.className || ''}>
                                    {
                                        typeof o.title === 'function' ? o.title.call(this, o, i) : o.title
                                    }
                                </th>;
                            })
                        }
                    </tr>
                </thead>
            </table>
            <div className="fp-table-content-wrap" style={{
                height: props.initHeight,
                overflowY: props.initHeight ? 'auto' : 'visible'
            }}>
                <table className='fp-table fp-table-fixed-head-body'>
                    <colgroup>{colGroups}</colgroup>
                    <tbody>
                        {
                            data.data.length ? data.data.map(function (o:any, i:any) {
                                var cls = [];
                                if (props.data.stripe && i % 2) {
                                    cls.push('fp-stripe');
                                }
                                if (i == data.data.length - 1) {
                                    cls.push('fp-table-last-tr');
                                }

                                return <tr className={cls.join(' ')} data-index={i}
                                    style={rowStyle && rowStyle[i + 1] ? rowStyle[i + 1] : {}}>
                                    {
                                        data.struct.map(function (p: any, index: any) {
                                            return <td className={p.className || ''}>
                                                {typeof p.key == 'function' ? p.key.call(o, i, index, p) : o[p.key]}
                                            </td>;
                                        })
                                    }
                                </tr>;
                            }.bind(this))
                                : <tr>
                                    <td colSpan={data.struct.length} style={{
                                        width: '100%',
                                        borderBottom: 0
                                    }}>
                                        {
                                            props.isFixedLeft || props.isFixedRight
                                                ? '-'
                                                : props.emptyText || '未查询到数据'
                                        }

                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Temp;
