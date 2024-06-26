import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useLocation, useParams, useSearchParams } from 'umi';

import request from '@/utils/request';

import { Pagination, Queryform, Select, Dialog, Table, ScrollTable, CollapseTable, TabPage } from 'cmao-ui';
const Prompt = Dialog.Prompt;



const Temp = forwardRef((props: any, ref) => {
    let [totalCount, setTotalCount] = useState<any>();
    let [table, setTable] = useState<any>({
        isCollapse: props.tableCollapse,
        isScroll: props.tableScroll,
        struct: props.tableStruct || [],
        stripe: props.tableStripe != undefined ? props.tableStripe : true,
        data: [],
        showSubData: props.showSubData
    });
    let [pageLength] = useState<any>(5);
    let [groups] = useState<any>(props.groups || []);
    let [dictData] = useState<any>({});
    let pageSizes = [
        { name: 10, value: 10 },
        { name: 20, value: 20 },
        { name: 50, value: 50 },
        { name: 100, value: 100 },
        { name: 500, value: 500 }
    ];

    const [searchParams, setSearchParams] = useSearchParams();

    // 将外部需要访问的属性和方法暴露出去
    useImperativeHandle(ref, () => ({
        queryList,
        getList
    }));

    useEffect(() => {
        queryList();
    }, []);

    const getList = () =>{
        return table;
    }

    const queryList = () => {
        if (!props.url) {
            return;
        }
        var params: any = {};
        for (var i in props.params) {
            params[i] = props.params[i];
            if (typeof params[i] == 'string') {  // 去头尾空格
                params[i] = params[i].trim();
            }
        }

        if (props.paramValidate) {
            if (!props.paramValidate(params)) {
                return;
            }
        }

        if (props.paramFormat) {
            params = props.paramFormat(params);
        }
        let thisLocation = window.location.href.split('?')[0];

        var ms = Prompt.loading();

        return request({
            url: props.url,
            method: props.method || 'get',
            params: params
        }).then((res: any) => {
            props.returnData && props.returnData(res.data);

            totalCount = (props.totalCountFormat && props.totalCountFormat(res.data.rows))
                || (res.data.pageIndex && res.data.totalCount)
                || 0;
            setTotalCount(totalCount);

            let newtable: any = {};
            Object.assign(newtable, table);
            newtable.data = res.data.rows;
            setTable(newtable);

            // if (window.location.href.split('?')[0] == thisLocation) {
            //     setHash();
            // }
            setHash();
        }).catch((data) => {
            console.log('%%%%%%');
            Prompt.error('查询失败! ');
        }).finally(() => {
            ms.destroy();
        })
    }

    const setHash = () => {
        if (!props.params) {
            return;
        }
        // var hashlocal = props.hashlocal;
        // if (!hashlocal) {
        //     return;
        // }
        var params = props.params;
        // var km = [];
        // for (var i in params) {
        //     if (params[i] !== undefined && params[i] !== '' && params[i] !== null) {
        //         km.push(i + '=' + params[i]);
        //     }
        // }
        // window.location.replace('#' + hashlocal + '?' + encodeURI(km.join('&')));
        setSearchParams(params)
    }

    const onPageChange = (page: any) => {
        if (props.onParamChange) {
            props.onParamChange('pageNo', page);
        }
        queryList();
    }

    const queryFormSubmit = (evt: any) => {
        evt.preventDefault();
        if (props.onParamChange) {
            props.onParamChange('pageNo', 1);
        }
        queryList();
    }

    const onSizeChange = (e: any) => {
        if (props.onParamChange) {
            props.onParamChange('pageNo', 1);
            props.onParamChange('pageSize', e.target.value);
        }
        queryList();
    }

    const tabsChange = (i: any) => {
        if (props.onParamChange) {
            props.onParamChange(props.tabs.name, props.tabs.items[i].value);
            props.onParamChange('pageNo', 1);
        }
        var promise = queryList();
        promise?.finally(function () {
            if (props.tabs.onChange) {
                props.tabs.onChange(props.tabs.items[i], i);
            }
        });
    }

    let tabs = null;
    if (props.tabs
        && props.tabs.items
        && props.tabs.items.length > 0) {
        var active = 0;
        for (var c = 0; c < props.tabs.items.length; c++) {
            if (props.tabs.items[c].value == props.params[props.tabs.name]) {
                active = c;
            }
        }
        tabs = <div className="tPd20"><TabPage
            nav={props.tabs.items}
            active={active}
            onChange={tabsChange}
        /></div>;
    }
    return (<div className='mQuery'>
        {tabs}
        {
            groups.length > 0 && !props.filterHide ?
                <div className="mForm">
                    <Queryform groups={
                        (function () {
                            groups.map((row: any) => {
                                row.map((item: any) => {
                                    if (!item.readonly) {
                                        item.value = props.params[item.name];
                                    }
                                    item.moreValue = props.params[item.more];
                                    item.size = props.params[item.size];
                                    if (item.type == 'Select' && item.dictCode) {
                                        item.options = dictData[item.dictCode];
                                    }
                                });
                            });
                            return groups;
                        })()
                    }
                        col={props.qfCols || groups[0].length}
                        onSubmit={queryFormSubmit}
                        onReset={props.onReset} />
                </div> : ''
        }
        <div className={'mTable ' + (groups.length > 0 ? '' : 'mTableNoBorder')}>
            {
                (props.operations || totalCount) &&
                    (!props.hidePageNum || !props.hideQueryStatus) ?
                    <div className='mPageSize tClear'>
                        {
                            props.operations && props.operations.map(function (d: any, i: any) {
                                return <div key={i}>{d}</div>;
                            })
                        }
                        {/* {
                            (totalCount && !props.hidePageNum) ? (
                                <div className='showNum'>
                                    每页显示
                                    <Select
                                        name="size"
                                        options={pageSizes}
                                        value={props.params.pageSize}
                                        onChange={onSizeChange}
                                        className='showNumSelect'
                                    />
                                    项结果
                                </div>
                            ) : null
                        } */}
                    </div>
                    : null
            }
            {
                table.isCollapse ?
                    <CollapseTable data={table} />
                    : table.isScroll ?
                        <ScrollTable data={table} />
                        : <Table data={table} emptyText={props.emptyText} />
            }
        </div>
        <div className='mListFooter'>
            {
                props.bottomOperations && props.bottomOperations.map((item: any) => {
                    return item;
                })
            }
            {
                totalCount ?
                    <Pagination
                        className='tRight'
                        page={props.params.pageNo}
                        size={props.params.pageSize}
                        len={pageLength}
                        total={totalCount}
                        onPageChange={onPageChange}
                    />
                    : null
            }
        </div>
    </div>);
})

export default Temp;
