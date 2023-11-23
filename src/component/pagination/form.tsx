import React, { useEffect, useState,useRef } from 'react';

import Input from '../input';
import Button from '../button';
import './module.scss';


const Temp = (props: any) => {
    const formRef = useRef<any>(null);

    useEffect(() => {
    }, []);

    const onPageChange = (e:any) =>{
        var pageObj = formRef.current.page;
        var page = pageObj.value;

        e.preventDefault();
        if (!page || !/^\d+$/.test(page)) {
            // pageObj.focus();

            return;
        }
        if (page < props.min) {
            page = props.min;
        } else if (page > props.max) {
            page = props.max;
        }

        props.onPageChange(page);
        // pageObj.value = '';
    }

    var cls = ['fp-page-form'];
    if (props.btnSize) {
        cls.push('fp-page-' + props.btnSize);
    }
    return (<form
        ref={formRef} 
        className={cls.join(' ')}
        onSubmit={onPageChange}
    >
        <fieldset>
            <span>跳至</span>
            <Input
                name="page"
                autoComplete="off"
                size={props.btnSize || ''}
            />
            <span>页&nbsp;/&nbsp;共&nbsp;{props.max}&nbsp;页&nbsp;共&nbsp;{props.total}&nbsp;条记录</span>
            {/* <Button
                type="submit"
                style="default"
                text="确定"
                size={props.btnSize || ''}
            /> */}
        </fieldset>
    </form>);
}

export default Temp;
