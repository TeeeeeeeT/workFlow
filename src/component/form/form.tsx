import React, { useEffect, useState, useMemo } from 'react';
import './module.scss';
import 'font-awesome/css/font-awesome.min.css'
import Prompt,{clearPrompt} from '@/component/dialog/prompt';
import type { FormContextProps } from './context';
import { FormContext } from './context';
import useForm, { FormInstance } from './hooks/useForm';
import { validator } from './validator';

interface Props {
    /**表单名称，显示表单头的名称 */
    name: string;
    /**form表单实例 
     * 获取方式 例子 const [form] = Form.useForm<xxx>();
     */
    form: FormInstance;
    children?: any;
}
const Temp = (props: Props) => {
    const { children, form, name, ...otherPorps } = props;
    let [formData, setFormData] = useState<any>({});
    let [formValidMsg, setFormValidMsg] = useState<any>({});
    let [formTitle, setFormTitle] = useState<any>({});


    const [wrapForm] = useForm(form);

    const lll: Record<number, any> = {};
    for (let i = 0; i < React.Children.count(props.children); i++) {
        lll[i] = React.useRef<any>();
    }

    useEffect(() => {


    }, []);

    const changeForm = (data: any) => {
        Object.assign(formData, data);
        setFormData({ ...formData });
        wrapForm.data = formData;
    }

    /**表单校验 */
    const valid = () => {
        clearPrompt();
        let validateflag = true;
        for (let key in formData) {
            //想要读取每个子元素中的校验方法
            let rule = form.getFieldValid(key);

            if (!rule) {
                continue;
            }

            let errormsg = form.getValidErrorMsg(key);
            if (errormsg) {
                validateflag = false;
                continue;
            }

            var checkexpession = rule.checkExpession;
            var checkfn = validator['is' + checkexpession];
            if (!checkexpession || !checkfn) { continue; }

            let value = null;
            value = formData[key];

            var r = { code: true, msg: '' };
            if (checkexpession == 'LenNum' || checkexpession == 'LenNumOrNull' || checkexpession == 'LenStr' || checkexpession == 'LenStrOrNull') {
                var len = rule.length;
                r = checkfn(value, len);
            } else {
                r = checkfn(value);
            }
            if (!r.code) {
                validateflag = false;
                formValidMsg[key] = r.msg;
                setFormValidMsg({ ...formValidMsg });

                Prompt.error('表单信息输入有误，请检查！ ' + formTitle[key] + r.msg);
            }

        }
        return validateflag;
    }

    //赋予form实例的校验方法
    wrapForm.checkRule = () => {
        return valid();
    }
    wrapForm.setData = (data: any) => {
        changeForm(data)
    }

    const formContextValue = useMemo<FormContextProps>(
        () => ({
            formData,
            formTitle,
            formValidMsg,
            changeForm,
            initValid: wrapForm.initValid
        }),
        [formData, formTitle, formValidMsg, changeForm]
    );

    let childNum = 0;
    return (
        <FormContext.Provider value={formContextValue}>
            <div className='cnki-panel'>
                <div className="panel-heading">
                    <h3 className="panel-title"><span className="lrlg">{props.name}</span></h3>
                </div>
                <div className='panel-body'>
                    <div className='cnki-form-wrap'>
                        {props.children}
                        {/* {
                            React.Children.map(props.children, child => {

                                let refd = React.useRef<any>();
                                var d = React.cloneElement(child, { ref: lll[childNum] })
                                // lll[childNum] = refd;
                                childNum++;
                                return d;
                            })
                        } */}
                    </div>
                </div>
            </div>
        </FormContext.Provider>
    );
}

export { useForm };

export default Temp;
