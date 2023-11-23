import React, { useEffect, useState } from 'react';

import dialogControllerFactory from './factory';
import './module.scss';
var idSub = "_dialog__";


/**
 * 使用方法：
 * <Dialog visible={this.state.dialog.visible}>
        I am Dialog
    </Dialog>
 */
const DialogWrap = (props: any) => {
    let [id] = useState<any>(idSub + new Date().getTime() / 10000 + Math.random() * 1000);
    let [dialogController] = useState<any>(dialogControllerFactory(id));

    var cls = ['fp-dialog-content', props.wrapClassName];
    console.log('dialogController.renderDialog');
    dialogController.renderDialog({
        content: <div className={cls.join(' ')}
            style={props.style}
            onClick={function (e) {
                e.stopPropagation();
            }}>
            {props.children}
        </div>,
        visible: props.visible,
        wrapClassName: 'fp-modal',
        mask: true,
        onMaskClick: props.onMaskClick
    });
    useEffect(() => {
    }, []);
    return (
        <div style={{
            display: 'none'
        }}></div>
    );
}

var id = idSub + new Date().getTime() / 10000 + Math.random() * 1000;
var dialogController = dialogControllerFactory(id);
DialogWrap.show = function (config: any) {

    if (typeof config == 'string') {
        config = {
            content: config
        };
    }

    var cls = ['fp-dialog-content', config.wrapClassName];
    dialogController.renderDialog({
        content: <div className={cls.join(' ')}
            style={config.style}
            onClick={function (e) {
                e.stopPropagation();
            }}>
            {config.content}
        </div>,
        visible: 1,
        wrapClassName: 'fp-modal',
        mask: true,
        onMaskClick: config.onMaskClick
    });

    return {
        destroy: function () {
            dialogController.destroy();
        }
    };
};

export default DialogWrap;
