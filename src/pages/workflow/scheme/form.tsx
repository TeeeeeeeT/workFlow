import React, { useEffect, useState } from 'react';
import '@/assets/style/form.scss';
import Wizard from '@/component/wizard/index';
import Row from '@/component/grid/row';
import Col from '@/component/grid/col';
import Input from '@/component/input/index';
import Workflow from '@/component/workflow/index';

import { schemeInfoSaveForm } from '@/api/workflow/scheme';

interface Form {
    [key: string]: string; // 添加索引签名
    code?: any;
    name?: any;
}

const Temp = (props: any) => {
    let [data, setData] = useState<Form>({});

    let list = [
        {
            name: '基本配置',
            content: <div className='cnki-panel'>
                <div className="panel-heading">
                    <h3 className="panel-title"><span className="lrlg">模板基本信息配置</span></h3>
                </div>
                <div className='panel-body'>
                    <div className='cnki-form-wrap'>
                        <Row>
                            <Col span={24} className='cnki-form-item'>
                                <div className="form-item-title">模板编号</div>
                                <Input className="form-control" name='code' placeholder="请输入" value={data.code} onChange={(e: any) => { onInputChange(e) }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className='cnki-form-item'>
                                <div className="form-item-title">模板名称</div>
                                <Input className="form-control" name='name' placeholder="请输入" value={data.code} onChange={(e: any) => { onInputChange(e) }} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        },
        { name: '权限设置', content: <div>222</div> },
        { name: '模板设计', content: <Workflow id="workflow" isPreview={false}/> }
    ];


    useEffect(() => {
    }, []);

    const onWizardChange = (data: any) => {
        if (data.direction == 'next') {
            if (data.step == 1) {

            }
        }
        return true;
    }

    const saveClick = () => {
        schemeInfoSaveForm(data).then((res: any) => {
            if (res.code == 200) {
                props.saveCallback && props.saveCallback();
            }
        });
    }

    const onInputChange = (e: any) => {
        data[e.target.name] = e.target.value;
        setData({ ...data });
    }


    return (<>
        <Wizard list={list} onChange={onWizardChange} saveClick={saveClick}></Wizard>
    </>);
}


export default Temp;
