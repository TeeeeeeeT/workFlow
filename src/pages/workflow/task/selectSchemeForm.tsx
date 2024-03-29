import React, { useEffect, useState, useRef } from 'react';
import ListView from '@/common/listview2';
import { Button, Dialog } from 'cmao-ui';
const Prompt = Dialog.Prompt;

interface Data {
    id?: string;
    name?: string,
}

interface Props {
    params?: any;
    /**点击确认按钮的回调方法，参数选中的流程模板id */
    sureCallback?: (arg0: Data) => void,
}
const Temp = (props: Props) => {
    //查询框条件
    const groups = [
        [
            {
                span: 4,
                type: 'TextInput',
                label: '名称:',
                name: 'name',
                placeholder: '请输入名称',
                onChange: (e: any) => { onChange(e) }
            }
        ]
    ];
    //table列头
    const tableStruct = [
        {
            title: '',
            width: 50,
            key: (d: any) => {
                return (
                    <div>
                        <input type='radio' name="ddd" onChange={() => { setSelectData({ id: d.id, name: d.name }) }}></input>
                    </div>
                );
            }
        },
        { title: '编号', key: 'code' },
        { title: '名称', key: 'name' }
    ];
    let [params, setParams] = useState<any>({});
    let [selectId, setSelectId] = useState<any>(null);
    let [selectData, setSelectData] = useState<any>(null);

    // const location = useLocation();
    // let urlParams = getUrlVars(location.search);
    // Object.assign(urlParams, params);
    // params = { ...urlParams };

    // params.pageSize = params.pageSize || 10;
    // params.pageIndex = params.pageIndex || 1;
    // 

    params.pageSize = 10;
    params.pageIndex = 1;

    let operations: any = [];

    let [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    let [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    let [viewId, setViewId] = useState<string>('');//存放查看详情的id
    const listViewRef = useRef<any>(null);

    useEffect(() => {
        setParams({ ...params });
    }, []);

    const onChange = (e: any) => {
        onParamChange(e.target.name, e.target.value);
    }

    const onParamChange = (name: any, value: any) => {
        params[name] = value;
        setParams({ ...params });
    }

    const returnData = (json: any) => {
        // console.log(json)
    };

    const sure = () => {
        if (!selectData) {
            Prompt.warn("请选择流程模板！")
            return;
        }
        // var data:Data = {
        //     id :selectId
        // };
        props.sureCallback && props.sureCallback(selectData);
    }

    return (<>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 45 }}>
            <ListView
                ref={listViewRef}
                url={'/api/workflow/schemeInfo/getPageList'}
                method="get"
                contentType="application/json"
                params={params}
                tableStruct={tableStruct}
                groups={groups}
                operations={operations}
            />
        </div>

        <div style={{ position: 'absolute', height: 45, left: 0, right: 0, bottom: 0, textAlign: 'right' }}>
            <Button onClick={() => { sure() }}>确定</Button>
        </div>
    </>);
}

export default Temp;
