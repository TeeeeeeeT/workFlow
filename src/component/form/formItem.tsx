import React, { useEffect, useState, useContext, useRef, forwardRef, useImperativeHandle } from 'react';
import './module.scss';
import Row from '@/component/grid/row';
import Col from '@/component/grid/col';
// import Input from '@/component/input/index';
import { FormContext } from './context';
import useItemRef from './hooks/useItemRef';
import { RuleConfig } from './validator';

interface Props {
    /**标题 左侧label名 */
    title: string;
    /**对象名 */
    name: string;
    /**是否需要验证 */
    isValid?: boolean;
    /**校验规则 */
    rules?: RuleConfig,
    children?: any;
}
const Temp = forwardRef((props: Props, ref) => {
    const { children, rules, ...otherPorps } = props;
    let { formData, formTitle, formValidMsg, changeForm, initValid } = useContext(FormContext);

    useEffect(() => {
        let data: any = {};
        data[props.name] = null;
        changeForm && changeForm(data);
        formTitle[props.name] = props.title;
    }, []);

    // // 将外部需要访问的属性和方法暴露出去
    // useImperativeHandle(ref, () => ({
    //     ddd
    // }));

    // const ddd = () => {
    //     console.log('item-formData-vvv', props.name);
    //     console.log('item-formData-ddd', formData);
    // }

    const onChange = (e: any) => {
        let data: any = {};
        Object.assign(data, formData);
        data[props.name] = e.target.value;
        changeForm && changeForm(data);
        //变更时，去除错误信息框
        formValidMsg[props.name] = '';

    }

    if (props.isValid) {
        //写入校验规则到form实例
        initValid(props.name, props.rules);
    }

    return (<>
        <Row>
            <Col span={24} className='cnki-form-item'>
                <div className="form-item-title">{props.title}</div>
                <div className="form-control">
                    {
                        React.Children.map(children, child => {
                            let cls = {};
                            if (formValidMsg[props.name]) {
                                cls = { className: 'cnki-field-error' };
                            }
                            return React.cloneElement(child, { ...otherPorps, ...cls, ...{ onChange: onChange, value: formData[props.name] || '' } })
                        })
                    }
                    {
                        formValidMsg[props.name] ? <div className='cnki-field-error-info' title={formValidMsg[props.name]}><i className='fa fa-info-circle'></i></div> : null
                    }
                </div>
            </Col>
        </Row>
    </>);
});

export default Temp;
