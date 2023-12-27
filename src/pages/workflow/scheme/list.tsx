import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useSearchParams } from 'umi';
import ListView from '@/common/listview';
import Button from '@/component/button';
import Modal from '@/component/dialog/modal';
import Prompt from '@/component/dialog/prompt';
import Form from './form';
import { getUrlVars } from '@/common/common';
import { schemeInfoDeleteInfoById } from '@/api/workflow/scheme';

interface Props {
    params?: any
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
            },
            // {
            //     span: '4',
            //     type: 'Select',
            //     label: '是否启用:',
            //     name: 'status',
            //     options: [
            //         { name: '全部', value: '' },
            //         { name: '启用', value: '01' },
            //         { name: '禁用', value: '00' }
            //     ]
            // }
        ]
    ];
    //table列头
    const tableStruct = [
        { title: '编号', key: 'code' },
        { title: '名称', key: 'name' },
        {
            title: '操作',
            width: 160,
            key: (d: any) => {
                return (
                    <div>
                        {/* <a onClick={() => {
                            setViewId(d.id);
                            setUpdateModalVisible(true);
                        }}>修改</a> */}
                        <Button text="修改" style="primary" type="link" onClick={() => {
                            setViewId(d.id);
                            setUpdateModalVisible(true);
                        }} />
                        <Button text="删除" style="primary" className='fp-btn-red' type="link" onClick={() => {
                            deleteById(d.id);
                        }} />
                    </div>
                );
            }
        }
    ];
    let [params, setParams] = useState<any>({});

    const location = useLocation();
    let urlParams = getUrlVars(location.search);
    Object.assign(urlParams, params);
    params = { ...urlParams };

    for (let o in props.params) {
        params[o] = props.params[o];
    }
    params.pageSize = params.pageSize || 10;
    params.pageIndex = params.pageIndex || 1;
    // 

    let operations: any = [
        <Button text="新增" style="yellow" type="link" onClick={() => { setAddModalVisible(true) }} />
    ];

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

    const saveFormCallback = () => {
        setAddModalVisible(false);
        setUpdateModalVisible(false);
        listViewRef.current.queryList();
    }

    const deleteById = (id: any) => {
        var m = Modal.confirm({
            title: '提示',
            content: '是否确认删除？',
            onOk: function () {
                var ms = Prompt.loading();
                schemeInfoDeleteInfoById({ id: id }).then((res: any) => {
                    if (res.code == 200) {
                        Prompt.success('删除成功！');
                        listViewRef.current.queryList();
                        m.destroy();
                    }
                }).finally(() => {
                    ms.destroy();
                });
            }
        });
    }

    return (<>
        <ListView
            ref={listViewRef}
            url={'/workflow/schemeInfo/getPageList'}
            method="get"
            contentType="application/json"
            params={params}
            tableStruct={tableStruct}
            groups={groups}
            operations={operations}
        />
        <Modal
            visible={addModalVisible}
            title='新增流程模板'
            style={{
                top: 20,
                width: 1200,
                height: 650
            }}
            onCancel={() => {
                setAddModalVisible(false)
            }}
            onOk={() => {
                setAddModalVisible(false)
            }}
            footer={null}
        >
            <Form saveCallback={saveFormCallback} />
        </Modal>
        <Modal
            visible={updateModalVisible}
            title='编辑流程模板'
            style={{
                top: 20,
                width: 1200,
                height: 650
            }}
            onCancel={() => {
                setUpdateModalVisible(false)
            }}
            onOk={() => {
                setUpdateModalVisible(false)
            }}
            footer={null}
        >
            <Form saveCallback={saveFormCallback} id={viewId} />
        </Modal>
    </>);
}

export default Temp;
