import React, { useEffect, useState, useRef } from 'react';
import { Wizard, Grid, Input, Workflow, Form, Dialog, TabPage, Button, Select } from 'cmao-ui';
const Row = Grid.Row;
const Col = Grid.Col;
const Prompt = Dialog.Prompt;

import { schemeInfoGetFormById, schemeInfoSaveForm } from '@/api/workflow/scheme';

interface FormEntity {
    [key: string]: string; // 添加索引签名
    id?: any;
    isNext?: any;
    name?: any;
}

interface Props {
    /**点击保存按钮的回调方法 */
    saveCallback?: (arg0: FormEntity) => void,
    /**查看表单使用的id。传值就是要查看 */
    id?: any,
    /**查看的线条 */
    line: any,
    /**查看线条的from节点 */
    fromNode: any
}
const Temp = (props: Props) => {
    let [active, setActive] = useState<any>(0);
    let [nav, setNav] = useState<any>([]);
    let [isShowAgreeSelect, setIsShowAgreeSelect] = useState<boolean>(false);
    const [wrapForm] = Form.useForm<FormEntity>();

    useEffect(() => {
        switch (props.fromNode.type) {
            case 'startround':// 开始节点
                nav = ['基本设置'];
                break;
            case 'stepnode':   // 审核节点
                nav = ['基本设置'];
                break;
        }
        let tmpdata = props.line;
        if(tmpdata){
            if (tmpdata.strategy == null) {
                tmpdata.strategy = 1;
                tmpdata.agreeList = '';
            }
            else if(tmpdata.strategy ==2){
                setIsShowAgreeSelect(true);
            }
        }
        wrapForm.setData(props.line)
        setNav([...nav]);
    }, []);


    const onchange = (i: any) => {
        setActive(i);
    }

    const selectOnchange = (e: any) => {
        if (!e && !e.target && !e.target.name) {
            return;
        }
        if (e.target.name == 'strategy') {
            if (e.target.value == 2) {
                setIsShowAgreeSelect(true)
            }
            else {
                // tmpdata.agreeList = '';
                wrapForm.data!.agreeList = '';
                wrapForm.setData(wrapForm.data!)
                setIsShowAgreeSelect(false)
            }
        }
    }

    const sure = () => {
        if (wrapForm.checkRule && !wrapForm.checkRule()) {
            return;
        }
        console.log(wrapForm.data);
        props.saveCallback && props.saveCallback(wrapForm.data!);
    }

    /**处理html页面 */
    const handleHtml = () => {
        let _html = null;
        switch (props.fromNode.type) {
            case 'startround':
                _html = <Form name='' form={wrapForm}>
                    <TabPage nav={nav} active={active} onChange={onchange}>
                        <>
                            <Form.Item title='名称' name='name' isValid={true} rules={{ checkExpession: 'NotNull' }}>
                                <Input placeholder="请输入" />
                            </Form.Item>
                        </>
                    </TabPage>
                </Form>
                break;
            case 'stepnode':
                _html = <Form name='' form={wrapForm}>
                    <TabPage nav={nav} active={active} onChange={onchange}>
                        <>
                            <Form.Item title='名称' name='name' >
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item title='颜色' name='color' type="select">
                                <Select options={[{ name: '黑', value: '1' }, { name: '红', value: '2' }]} size="lg" wtype='1' disabled={false} />
                            </Form.Item>
                            <Form.Item title='通过策略' name='strategy' type="select">
                                <Select options={[{ name: '所有情况都通过', value: '1' }, { name: '自定义设置', value: '2' }]} size="lg" wtype='1' disabled={false} onchange={selectOnchange} />
                            </Form.Item>
                            {
                                isShowAgreeSelect ? <Form.Item title='通过项' name='agreeList' type="select">
                                    <Select options={[{ name: '同意', value: 'agree' }, { name: '不同意', value: 'disagree' }]} size="lg" wtype='1' disabled={false} />
                                </Form.Item> : null
                            }

                        </>
                    </TabPage>
                </Form>
                break;
        }
        return _html;
    }

    return <><div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 45 }}>
        {handleHtml()}
    </div>
        <div style={{ position: 'absolute', height: 45, left: 0, right: 0, bottom: 0, textAlign: 'right' }}>
            <Button onClick={() => { sure() }}>确定</Button>
        </div></>;
}


export default Temp;
