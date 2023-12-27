import * as React from 'react';

import { RuleConfig } from './../validator';

/**form组件表单实例 */
export interface FormInstance<Values = any> {
    /** @internal: This is an internal usage. Do not use in your prod */
    __INTERNAL__: {
        /** No! Do not use this in your code! */
        name?: string;
        /** No! Do not use this in your code! */
        itemRef: (name: string) => (node: React.ReactElement) => void;
        // itemValid: (name: string, obj: any) => void;
    };
    /**初始化校验规则 */
    initValid: (name: string, obj: any) => void;
    getFieldInstance: (name: string) => any;
    /**获取表单key对应的校验规则 */
    getFieldValid: (name: string) => RuleConfig;
    getValidErrorMsg: (name: string) => any;
    /**校验表单是否符合rule规则，返回true or false */
    checkRule?: () => boolean;
    /**设置表单数据 */
    setData: (data: Values) => void;
    data?: Values
}


export default function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
    const itemsRef = React.useRef<Record<string, React.ReactElement>>({});
    /**存放表单对象各key关联的校验规则 */
    let validFormObj: Record<string, any> = {};
    let validErrorMsgObj: Record<string, any> = {};

    const wrapForm: FormInstance<Values> = React.useMemo(
        () =>
            form ?? {
                __INTERNAL__: {
                    itemRef: (name: string) => (node: React.ReactElement) => {
                        if (node) {
                            itemsRef.current[name] = node;
                        } else {
                            delete itemsRef.current[name];
                        }
                    },
                    initVaildErrorMsg: (name: string, obj: string) => {
                        if (obj) {
                            validErrorMsgObj[name] = obj
                        } else {
                            delete validErrorMsgObj[name];
                        }
                    }
                },
                initValid: (name: string, obj: any) => {
                    if (obj) {
                        validFormObj[name] = obj
                    } else {
                        delete validFormObj[name];
                    }
                },
                getFieldInstance: (name: string) => {
                    return itemsRef.current[name];
                },
                getFieldValid: (name: string) => {
                    return validFormObj[name];
                },
                getValidErrorMsg: (name: string) => {
                    return validErrorMsgObj[name];
                },
                setData: (data: Values) => { }
            },
        [form],
    );
    return [wrapForm];
}


