import React, { useState, useEffect, useRef } from 'react';
import './module.scss';
import TableFixedHead from './tableFixedHead';

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
    const formatData = (data: any) => {
        let leftData: any = {
            struct: [],
            stripe: data.stripe,
            data: data.data
        };
        let rightData: any = {
            struct: [],
            stripe: data.stripe,
            data: data.data
        };
        let width = 0;

        data.struct.map((item: any, index: any) => {
            width += (item.width || cellMinWidth);
            if (item.fixed == 'left') {
                leftData.struct.push(item);
            } else if (item.fixed == 'right') {
                rightData.struct.push(item);
            }
        });

        return {
            leftData,
            rightData,
            width
        };
    }

    let result = formatData(props.data);

    let [elem] = useState<any>();
    let [leftShadow, setLeftShadow] = useState<any>(false);
    let [rightShadow, setRightShadow] = useState<any>(true);
    let [leftData] = useState<any>(result.leftData);
    let [rightData] = useState<any>(result.rightData);
    let [tableWidth] = useState<any>(result.width);
    let [rowStyle, setRowStyle] = useState<any>([]);
    let [shouldRender, setShouldRender] = useState<any>();

    const contentTableRef = useRef<any>(null);

    useEffect(() => {
        // 主表格更新后，重新计算高度，并且通过setState重新渲染左右表格
        if (shouldRender) {
            shouldRender = false;
            setShouldRender(false);
            getRowStyle();
        }
    }, []);



    // 处理左右table的阴影
    const onScroll = (e: any) => {
        var scrollLeft = e.target.scrollLeft;
        var flagL = false, flagR = true;
        if (scrollLeft > 0) {
            flagL = true;
        } else {
            flagL = false;
        }

        if (scrollLeft >= tableWidth - e.target.clientWidth) {
            flagR = false;
        } else {
            flagR = true;
        }
        setLeftShadow(flagL);
        setRightShadow(flagR);
    }

    // 计算content table每一行的高度，左右table每一行的高度保持跟content table行高一致
    const getRowStyle = () => {
        if (!contentTableRef) {
            return null;
        }
        elem = contentTableRef.current.getDOMNode();
        rowStyle = [];
        // $(this.elem).find('tr').each((index, item) => {
        //     rowStyle.push({ height: $(item).height() });
        // });

        setRowStyle([...rowStyle]);
    }

    let cellMinWidth = 80;
    let leftCls = ['fp-table-left-wrap'];
    let rightCls = ['fp-table-right-wrap'];
    if (leftShadow) {
        leftCls.push('left-shadow');
    }
    if (rightShadow) {
        rightCls.push('right-shadow');
    }
    let tableWrapWidth;
    return (
        <div className="fp-table-scroll-wrap">
            <div className="fp-table-scroll-content" onScroll={onScroll} 
            // ref={o => {tableWrapWidth = $(o).width();}}
                >
                <TableFixedHead
                    ref={contentTableRef}
                    data={props.data}
                    style={{ width: tableWrapWidth }}
                    minWidth={cellMinWidth} />
            </div>

            {
                leftData.struct.length > 0 ?
                    <div className={leftCls.join(' ')}>
                        <TableFixedHead data={leftData}
                            minWidth={cellMinWidth}
                            rowStyle={rowStyle}
                            isFixedLeft={true} />  {/* 保持两边table的tr行高与content table行高一致 */}
                    </div>
                    : null
            }
            {
                rightData.struct.length > 0 ?
                    <div className={rightCls.join(' ')}>
                        <TableFixedHead data={rightData}
                            minWidth={cellMinWidth}
                            rowStyle={rowStyle}
                            isFixedRight={true} />  {/* 保持两边table的tr行高与content table行高一致 */}
                    </div>
                    : null
            }
        </div>
    );
};

export default Temp;
