import React, { useEffect, useState, useRef } from 'react';
import { Wizard, Grid, Input, Workflow, Form, Dialog } from 'cmao-ui';
const Row = Grid.Row;
const Col = Grid.Col;
const Prompt = Dialog.Prompt;
const Modal = Dialog.Modal;
import NodeForm from './nodeForm';
import LineForm from './lineForm';

import { schemeInfoGetFormById, schemeInfoSaveForm } from '@/api/workflow/scheme';

interface FormEntity {
    [key: string]: string; // 添加索引签名
    code?: any;
    name?: any;
}

interface Props {
    /**点击保存按钮的回调方法 */
    saveCallback?: () => void,
    /**查看表单使用的id。传值就是要查看 */
    id?: any
}
const Temp = (props: Props) => {
    let [openNodeVisible, setOpenNodeVisible] = useState<boolean>(false);
    let [openLineVisible, setOpenLineVisible] = useState<boolean>(false);
    let [currentNode, setCurrentNode] = useState<any>();
    let [currentLine, setCurrentLine] = useState<any>();
    let [currentLineFromNode, setCurrentLineFromNode] = useState<any>();

    const [wrapForm] = Form.useForm<FormEntity>();
    const workflowRef = useRef<any>(null);

//     <Form.Item title='模板json' name='content' isValid={true} rules={{ checkExpession: 'NotNull' }}>
//     <Input placeholder="请输入" />
// </Form.Item>
    let list = [
        {
            name: '基本配置',
            content: <Form name='模板基本信息配置' form={wrapForm}>
                <Form.Item title='模板编号' name='code' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item title='模板名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                    <Input placeholder="请输入" />
                </Form.Item>
            </Form>
        },
        { name: '权限设置', content: <div>222</div> },
        { name: '模板设计', content: <Workflow id="workflow" isPreview={false} ref={workflowRef} openNode={(node) => { openNode(node) }} openLine={(line, node) => { openLine(line, node) }} /> }
    ];

    useEffect(() => {
        //判断是否查看状态
        if (props.id) {
            var ms = Prompt.loading();
            schemeInfoGetFormById({ id: props.id }).then((res: any) => {
                if (res.code == 200) {
                    wrapForm.setData(res.data);
                    if (res.data.schemeObj) {
                        let shceme = res.data.schemeObj;
                        let op = {
                            data: shceme
                        }
                        workflowRef.current.workflowSet('set', op);
                    }
                }
            }).finally(() => {
                ms.destroy();
            });
        }
    }, []);

    /**步骤切换change回调 */
    const onWizardChange = (data: any) => {
        if (data.direction == 'next') {
            if (data.currentStep == 1) {
                if (wrapForm.checkRule) {
                    return wrapForm.checkRule()
                }
            }
        }
        return true;
    }

    const saveClick = () => {
        let postData: any = {};
        // postData.code = wrapForm.data!.code;
        // postData.name = wrapForm.data!.name;
        Object.assign(postData, wrapForm.data);
        console.log('wrapForm.Data', wrapForm.data);
        let shcemeData = workflowRef.current.workflowGet();
        // postData.schemeContent = JSON.stringify(shcemeData);
        postData.SchemeObj = shcemeData;
        // postData.SchemeObj = JSON.parse(postData.content);
        // return;

        schemeInfoSaveForm(postData).then((res: any) => {
            if (res.code == 200) {
                props.saveCallback && props.saveCallback();
            }
        });
    }

    const openNode = (node: any) => {
        setCurrentNode(node);
        setOpenNodeVisible(true);
    }

    const openLine = (line: any, node: any) => {
        setCurrentLine(line);
        setCurrentLineFromNode(node);
        setOpenLineVisible(true);
    }

    /**点击节点详情后确认回调 */
    const nodeSaveClick = (data: any) => {
        workflowRef.current.workflowSet('updateNodeById', { id: data.id, data: data });
        setOpenNodeVisible(false);
        setCurrentNode(null);
    }

    const lineSaveClick = (data: any) => {

        workflowRef.current.workflowSet('updateLineById', { id: data.id, data: data });
        setOpenLineVisible(false);
        setCurrentLine(null);
        setCurrentLineFromNode(null);
    }

    return (<>
        <Wizard list={list} onChange={onWizardChange} saveClick={saveClick}></Wizard>
        <Modal
            visible={openNodeVisible}
            title='节点设置'
            style={{
                // top: 20,
                width: 700,
                height: 550
            }}
            onCancel={() => {
                setOpenNodeVisible(false);
                setCurrentNode(null);
            }}
            onOk={() => {
                setOpenNodeVisible(false);
                setCurrentNode(null);
            }}
            footer={null}
        >
            <NodeForm node={currentNode} saveCallback={nodeSaveClick} />
        </Modal>
        <Modal
            visible={openLineVisible}
            title='线条设置'
            style={{
                width: 700,
                height: 550
            }}
            onCancel={() => {
                setOpenLineVisible(false);
                setCurrentLine(null);
                setCurrentLineFromNode(null);
            }}
            onOk={() => {
                setOpenLineVisible(false);
                setCurrentLine(null);
                setCurrentLineFromNode(null);
            }}
            footer={null}
        >
            <LineForm line={currentLine} fromNode={currentLineFromNode} saveCallback={lineSaveClick} />
        </Modal>
    </>);
}


export default Temp;
