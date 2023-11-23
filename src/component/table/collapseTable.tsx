import React, { useState, useEffect } from 'react';
import './module.scss';
// var Table = require('./table.js');

/**
 * 使用方法
 * <CollapseTable data={this.state.tableCollapse} />
 * tableCollapse: {
    struct: [
        { title: '', key: 'collapse', width: 80 },
        { title: '姓名', key: 'name', width: 200 },
        { title: '手机号码', key: 'phone', width: 200 }
    ],
    data: [
        {
            name: 'hello1',
            phone: '18768112222',
            subData: (d, i) => {
                return <div className="table-inner-wrap">
                    我是嵌套的内容
                </div>
            }
        },
    ],
    showSubData: false
}
 * struct增加一列，key为collapse
 * data子项中，有subData则有嵌套内容，subData为一个函数
 * showSubData为默认嵌套内容是否全部展开，true为全展开，false为全隐藏，不传为全隐藏
 * <ListView tableCollapse={true}/>
 */
const Temp = (props: any) => {
    let [showSubDataArr, setShowSubDataArr] = useState<any>();

    useEffect(() => {
        var data = props.data;
        var showSubDataArr = [];
        for (var i = 0; i < data.data.length; i++) {
            if (data.showSubData) {
                showSubDataArr.push(true);
            } else {
                showSubDataArr.push(false);
            }
        }
        setShowSubDataArr([...showSubDataArr]);
    }, []);

    const toggleRow = (i: any) => {
        showSubDataArr[i] = !showSubDataArr[i];
        setShowSubDataArr(showSubDataArr[i]);
    }

    let tableWrapWidth;
    let cls = ['fp-table-fixed-head'];
    let data = props.data;
    let rowStyle = props.rowStyle;
    let style = {};
    let colGroups: any = [];
    data.struct.map((o: any, i: any) => {
        colGroups.push(<col width={o.width || props.minWidth}></col>);
    });
    return (
        <div className="fp-table-scroll-wrap">
            <div className="fp-table-scroll-content">
                <div className={cls.join(' ')} style={props.style || {}}>
                    {/* ltable*/}
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
                                    data.data.length ? data.data.map(function (o: any, i: any) {
                                        var cls = [];
                                        if (data.stripe && i % 2) {
                                            cls.push('fp-stripe');
                                        }
                                        if (i == data.data.length - 1 && !o.subData) {
                                            cls.push('fp-table-last-tr');
                                        }

                                        var subCls = [];
                                        if (data.showSubData) {
                                            subCls.push('fp-subTable-show');
                                        } else {
                                            subCls.push('fp-subTable-hide');
                                        }

                                        var iconCls = ['fp-icon'];
                                        if (showSubDataArr[i]) {
                                            iconCls.push('fp-icon-expand');
                                        } else {
                                            iconCls.push('fp-icon-collapse');
                                        }

                                        var subData = {
                                            struct: data.subStruct,
                                            data: o.subData
                                        };
                                        return [<tr className={cls.join(' ')} data-index={i}>
                                            {
                                                data.struct.map(function (p: any, index: any) {
                                                    if (p.key === 'collapse' && o.subData) {
                                                        return <td className={p.className || ''}>
                                                            <span onClick={() => { toggleRow(i) }} className={iconCls.join(' ')}></span>
                                                        </td>;
                                                    }
                                                    return <td className={p.className || ''}>
                                                        {typeof p.key == 'function' ? p.key.call(o, i, index, p) : o[p.key]}
                                                    </td>;
                                                })
                                            }
                                        </tr>,
                                        <tr className={subCls.join(' ')} style={{ height: showSubDataArr[i] ? 'auto' : 0 }}>
                                            {
                                                showSubDataArr[i] && o.subData
                                                    ? <td colSpan={data.struct.length}>{o.subData.call(o, i)}</td>
                                                    : null
                                            }
                                        </tr>];
                                    }.bind(this))
                                        : <tr>
                                            <td colSpan={data.struct.length} style={{
                                                width: '100%',
                                                borderBottom: 0
                                            }}>
                                                {props.emptyText || '未查询到数据'}
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temp;
