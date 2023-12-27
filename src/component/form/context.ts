import React from "react";

export interface FormContextProps {
    formData?: any;
    /**表单中各字段对应的title key:value */
    formTitle?: any;
    /**表单中各字段校验信息，空则校验没问题 key:value */
    formValidMsg?: any;
    changeForm?: (form: any) => void;
    // itemRef: (name: string) => (node: React.ReactElement) => void;
    /**将校验rule存放到context */
    initValid: (name: string, obj: any) => void;
}
export const FormContext = React.createContext<FormContextProps>({
    // itemRef: (() => { }) as any,
    initValid: (() => { }) as any
});