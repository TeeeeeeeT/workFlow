import React, { useEffect, useState, useRef } from 'react';
import ListView from '@/common/listview';
import Button from '@/component/button';
import Modal from '@/component/dialog/modal';

import Form from './form';

const Temp = (props: any) => {
    const tabs = {
        items: ['<div>122</div>', (d: any) => {
            return (
                <div>
                    <a>修改</a>
                </div>
            );
        }]
    }
    //查询框条件
    const groups = [
        [
            {
                span: '4',
                type: 'Select',
                label: '角色名称:',
                name: 'roleid'
            },
            {
                span: 4,
                type: 'TextInput',
                label: '用户名称:',
                name: 'realName',
                placeholder: '请输入用户名称'
            },
            {
                span: 4,
                type: 'TextInput',
                label: '手机号:',
                name: 'phoneNumber',
                placeholder: '请输入手机号'
            },
            {
                span: '4',
                type: 'Select',
                label: '是否启用:',
                name: 'status',
                options: [
                    { name: '全部', value: '' },
                    { name: '启用', value: '01' },
                    { name: '禁用', value: '00' }
                ]
            }
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
                        <a>修改</a>
                    </div>
                );
            }
        }
    ];
    let params: any = {};
    for (let o in props.params) {
        params[o] = props.params[o];
    }
    params.pageSize = params.pageSize || 10;
    params.pageNo = params.pageNo || 1;

    let operations: any = [
        <Button text="新增" style="yellow" type="link" onClick={() => { setCreateModalVisible(true) }} />
    ];

    let [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const listViewRef = useRef<any>(null);

    useEffect(() => {
    }, []);

    const saveFormCallback = () =>{
        setCreateModalVisible(false);
        listViewRef.current.queryList();
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
            visible={createModalVisible}
            title='新增流程模板'
            style={{
                top: 20,
                width: 1200,
                height: 650
            }}
            onCancel={() => {
                setCreateModalVisible(false)
            }}
            onOk={() => {
                setCreateModalVisible(false)
            }}
            footer={null}
        >
            <Form saveCallback={saveFormCallback} />
        </Modal>
    </>);
}

export default Temp;
