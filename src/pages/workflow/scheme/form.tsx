import React, { useEffect, useState, useRef } from 'react';
import Wizard from '@/component/wizard/index';
import Row from '@/component/grid/row';
import Col from '@/component/grid/col';
import Input from '@/component/input/index';
import Workflow from '@/component/workflow/index';
import Form from '@/component/form/index';
import Prompt from '@/component/dialog/prompt';

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
    // let [data, setData] = useState<FormEntity>({});
    const [wrapForm] = Form.useForm<FormEntity>();
    const workflowRef = useRef<any>(null);

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
        { name: '模板设计', content: <Workflow id="workflow" isPreview={false} ref={workflowRef} /> }
    ];

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
        let postData: any = {};
        Object.assign(postData, wrapForm.data);
        console.log('wrapForm.Data', wrapForm.data);
        let shcemeData = workflowRef.current.workflowGet();
        postData.schemeContent = JSON.stringify(shcemeData);

        schemeInfoSaveForm(postData).then((res: any) => {
            if (res.code == 200) {
                props.saveCallback && props.saveCallback();
            }
        });
    }

    return (<>
        <Wizard list={list} onChange={onWizardChange} saveClick={saveClick}></Wizard>
    </>);
}


export default Temp;
