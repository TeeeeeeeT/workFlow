// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';

import './module.scss';
var dialogId = '_dialog__';



var dialogControllerFactory = (id: any, mountPointClass = "") => {
    return {
        renderDialog: function (config: any) {

            /* config:{
                containerId:'',
                content:'',
                visible:0/1,
                style:{},
                wrapClassName:'',
                mask:true/false,
                onMaskClick:function
            } */
            let ele = document.getElementById(id || dialogId);
            if (ele == null) {
                var body = document.getElementsByTagName('body')[0];
                var dialogEle = document.createElement('div');
                dialogEle.id = id || dialogId;
                var className = ['caih-fireplug-dialog-mount-point', mountPointClass].filter(e => e).join(" ");
                dialogEle.className = className;
                body.appendChild(dialogEle);
                ele = dialogEle;
            }
            console.log('renderDialog');
            // ReactDOM.render(
            //     <Dialog
            //         // ref={function (dialogInstance:any) {
            //         //     dialogInstance = dialogInstance;
            //         // }}
            //         visible={config.visible}
            //         style={config.style}
            //         wrapClassName={config.wrapClassName}
            //         mask={config.mask}
            //         onMaskClick={config.onMaskClick}>
            //         {config.content}
            //     </Dialog>, ele
            // );
            // const container = document.getElementById('root');
            const root = ReactDOM.createRoot(ele);
            root.render(<Dialog
                // ref={function (dialogInstance:any) {
                //     dialogInstance = dialogInstance;
                // }}
                visible={config.visible}
                style={config.style}
                wrapClassName={config.wrapClassName}
                mask={config.mask}
                onMaskClick={config.onMaskClick}>
                {config.content}
            </Dialog>);
        },
        destroy: function () {
            let ele = document.getElementById(id || dialogId);
            return (<>
                <Dialog visible={false} />
                {ele}
            </>);
        }
    };
};

const Dialog = (props: any) => {
    // useEffect(() => {
    // }, []);

    const mask = () => {
        if (!props.mask) {
            return;
        }
        if (props.onMaskClick) {
            props.onMaskClick();
        }
    }

    var cls = ['fp-dialog', props.wrapClassName];
    var style = props.style;
    var view;
    if (props.visible) {
        view = <div>
            {props.mask ? <div className={'fp-mask'}></div> : ''}
            <div className={cls.join(' ')} onClick={mask} style={style}>
                {props.children}
            </div>
        </div>;
    } else {
        view = <div className=""></div>;
    }
    return view;
}

export default dialogControllerFactory;
