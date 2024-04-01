import React, { useEffect, useState, useRef } from 'react';
import { Wizard, Grid, Input, Workflow, Form, Dialog, TabPage, Button,Select } from 'cmao-ui';
const Row = Grid.Row;
const Col = Grid.Col;
const Prompt = Dialog.Prompt;

import { schemeInfoGetFormById, schemeInfoSaveForm } from '@/api/workflow/scheme';

interface FormEntity {
    // [key: string]: string; // 添加索引签名
    id?: any;
    isNext?: any;
    name?: any;
    isAllAuditor?: any;
}

interface Props {
    /**点击保存按钮的回调方法 */
    saveCallback?: (arg0: FormEntity) => void,
    /**查看表单使用的id。传值就是要查看 */
    id?: any,
    /**查看的节点 */
    node: any
}
const Temp = (props: Props) => {
    let [active, setActive] = useState<any>(0);
    let [nav, setNav] = useState<any>([]);
    let [tab, setTab] = useState<any>({
        nav: [],
        content: []
    });
    let [content, setContent] = useState<any>([]);
    const [wrapForm] = Form.useForm<FormEntity>();
    const workflowRef = useRef<any>(null);

    useEffect(() => {
        // wrapForm.setData({
        //     id: props.node?.id,
        //     name: props.node?.name,
        //     isNext: props.node?.name
        // })

        switch (props.node.type) {
            case 1:// 开始节点
                nav = ['基本设置'];
                break;
            case 3:   // 审核节点
                nav = ['基本设置'];
                break;
        }
        // console.log(props.node)
        let tmpData = props.node;
        // if(tmpData.isAllAuditor == true){
        //     tmpData.isAllAuditor = "true";
        // }
        // else{
        //     tmpData.isAllAuditor = 'false';
        // }
        wrapForm.setData(props.node)
        setNav([...nav]);
    }, []);


    const onchange = (i: any) => {
        setActive(i);
    }

    const sure = () => {

        // console.log(wrapForm.data);
        if (wrapForm.checkRule && !wrapForm.checkRule()) {
            return;
        }
        // //手动转true false
        // if(wrapForm.data!.isAllAuditor == 'true'){
        //     wrapForm.data!.isAllAuditor = true;
        // }
        // else{
        //     wrapForm.data!.isAllAuditor = false;
        // }
        console.log(wrapForm.data);
        props.saveCallback && props.saveCallback(wrapForm.data!);
    }

    /**处理html页面 */
    const handleHtml = () => {
        let _html = null;
        switch (props.node.type) {
            case 1:
                _html = (<Form name='' form={wrapForm}>
                    <TabPage nav={nav} active={active} onChange={onchange}>
                        <>
                            <Form.Item title='节点标识' name='id' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <Input placeholder="请输入" disabled={true} />
                            </Form.Item>
                            <Form.Item title='节点名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item title='下一节点审核人' name='isNext' type='radio' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <input name="isNext" type="radio" value="1" />
                                <span className="lrlg">允许手动指定</span>
                                <input name="isNext" type="radio" value="2" />
                                <span className="lrlg">不允许手动指定</span>
                            </Form.Item>
                        </>

                    </TabPage>
                </Form>);
                break;
            case 3:
                _html = (<Form name='' form={wrapForm}>
                    <TabPage nav={nav} active={active} onChange={onchange}>
                        <>
                            <Form.Item title='节点标识' name='id' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <Input placeholder="请输入" disabled={true} />
                            </Form.Item>
                            <Form.Item title='节点名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item title='所有审核者' name='isAllAuditor' type='select' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                {/* <input name="isAllAuditor" type="radio" value='false' />
                                <span>只要其中一人审核</span>
                                <input name="isAllAuditor" type="radio" value='true' />
                                <span>都需要审核</span> */}
                                
                                <Select options={[{ name: '只要其中一人审核', value: false }, { name: '都需要审核', value: true }]} size="lg" wtype='1' disabled={false} />
                            </Form.Item>
                        </>

                    </TabPage>
                </Form>);
                break;
            default:
                break;
        }
        return _html;
    }


    return <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 45 }}>
            {handleHtml()}
        </div>
        <div style={{ position: 'absolute', height: 45, left: 0, right: 0, bottom: 0, textAlign: 'right' }}>
            <Button onClick={() => { sure() }}>确定</Button>
        </div>
    </>;
}


export default Temp;
