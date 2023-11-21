import React, { useEffect, useState } from 'react';
import {
    ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';

// import services from '@/services';
// const { queryUserList } = services.UserController;

import { schemeGetPageList } from '@/api/workflow/scheme';

const Temp = () => {
    const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const columns = [
        {
            title: '流程模板名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            render: (_: any, record: any) => (
                <>
                    <a
                    // onClick={() => {
                    //     handleUpdateModalVisible(true);
                    //     setStepFormValues(record);
                    // }}
                    >
                        编辑
                    </a>
                    {/* <Divider type="vertical" /> */}
                    {/* <a href="">订阅警报</a> */}
                </>
            ),
        },
    ];
    useEffect(() => {
    }, []);

    return (
        <ProTable
            toolBarRender={() => [
                <Button
                    key="1"
                    type="primary"
                    onClick={() => handleCreateModalVisible(true)}
                >
                    新建
                </Button>,
            ]}
            columns={columns}
            request={async (params, sorter, filter) => {
                const res: any = await schemeGetPageList({
                    ...params
                });
                return {
                    data: res?.data?.rows || [],
                    success: res?.code == 200,
                };
            }}
        />
    );
}

export default Temp;
