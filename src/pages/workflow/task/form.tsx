import React, { useEffect, useState, useRef } from 'react';
import { Wizard, Grid, Input, Workflow, Form, Dialog, Select, Button } from 'cmao-ui';
const Row = Grid.Row;
const Col = Grid.Col;
const Prompt = Dialog.Prompt;
const Modal = Dialog.Modal;
import SelectSchemeForm from './selectSchemeForm'

import { schemeInfoGetFormById, schemeInfoSaveForm } from '@/api/workflow/scheme';
import { processCreateFlow } from '@/api/workflow/process';

interface FormEntity {
    [key: string]: string; // 添加索引签名
    code?: any;
    name?: any;
    /**流程模板id */
    schemeInfoId?: any;
}

interface Props {
    /**点击保存按钮的回调方法 */
    saveCallback?: () => void,
    /**查看表单使用的id。传值就是要查看 */
    id?: any
}
const Temp = (props: Props) => {
    let [selectOption, setSelectOption] = useState<any>([
        { name: 'apple', value: 1 }
    ]);
    let [chooseSchemeVisible, setChooseSchemeVisible] = useState<boolean>(false);

    const [wrapForm] = Form.useForm<FormEntity>();
    const workflowRef = useRef<any>(null);
    useEffect(() => {
        //判断是否查看状态
        if (props.id) {
            var ms = Prompt.loading();
            schemeInfoGetFormById({ id: props.id }).then((res: any) => {
                if (res.code == 200) {
                    wrapForm.setData(res.data.info);
                    if (res.data.scheme && res.data.scheme.content) {
                        let shceme = JSON.parse(res.data.scheme.content);
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
        if (wrapForm.checkRule && !wrapForm.checkRule()) {
            return;
        }
        let tmp = wrapForm.data;
        let postData: any = {
            schemeInfoId: tmp?.schemeInfoId,
            title: tmp?.name
        };
        processCreateFlow(postData).then((res: any) => {
            if (res.code == 200) {
                props.saveCallback && props.saveCallback();
            }
        });
    }


    /**选择流程后的回调，赋值 */
    const sureCallback = (data: any) => {
        let tmpData: any = wrapForm.data;
        tmpData.name = data.name;
        wrapForm.setData(tmpData!);
        setChooseSchemeVisible(false)
    }


    return (<>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 45 }}>
            <Form name='流程信息' form={wrapForm}>
                <Form.Item title='流程名称' name='code' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item title='' name='ddd'>
                    <Button onClick={() => { setChooseSchemeVisible(true) }}>选择流程模板</Button>
                </Form.Item>
                <Form.Item title='流程模板名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                    <Input disabled={true} />
                </Form.Item>
                {/* <Form.Item title='模板名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                <a onClick={()=>{d()}}>ddd</a>
            </Form.Item> */}
            </Form>
        </div>
        <div style={{ position: 'absolute', height: 45, left: 0, right: 0, bottom: 0, textAlign: 'right' }}>
            <Button onClick={() => { saveClick() }}>确定</Button>
        </div>

        <Modal
            visible={chooseSchemeVisible}
            title='选择流程模板'
            style={{
                top: 50,
                width: 1000,
                height: 550
            }}
            onCancel={() => {
                setChooseSchemeVisible(false)
            }}
            onOk={() => {
                setChooseSchemeVisible(false)
            }}
            footer={null}
        >
            <SelectSchemeForm sureCallback={sureCallback}></SelectSchemeForm>
        </Modal>
    </>);
}


export default Temp;
