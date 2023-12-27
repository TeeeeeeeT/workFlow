import React, { useEffect, useState } from 'react';

import Dialog from './dialog';

import './module.scss';
import Button from '../button/index';
import closeImg from './images/close.png';

/**
 * 使用方法：
 * <Modal visible={this.state.modal.visible}
        title='hello'
        style={{width: '200px'}}
        footer={null}
        onOk={this.onOK}
        onCancel={this.onCancel}>
        I am Modal
    </Modal>

 * footer可定义为null，则没有底部按钮
 * onOK：确定按钮回调函数
 * onCancel：取消按钮回调函数
 */
const Modal = (props: any) => {
    // useEffect(() => {
    // }, []);
    const onMaskClick = () => {
        if (props.maskClosable) {
            if (props.onCancel) {
                props.onCancel();
            }
        }
    }

    var cls = ['fp-modal-container', props.wrapClassName];
    return (
        <Dialog
            visible={props.visible}
            onMaskClick={onMaskClick}
            style={props.style}
            wrapClassName={cls.join(' ')}>
            {
                contentRender({
                    title: props.title,
                    content: props.children,
                    footer: props.footer,
                    bodyClass: props.bodyClass,
                    cancelText: props.cancelText,
                    okText: props.okText,
                    onCancel: props.onCancel,
                    onOk: props.onOk,
                    footerText: props.footerText
                })
            }
        </Dialog>
    );
}

Modal.show = function (config: any) {
    var cls = ['fp-modal-container', config.wrapClassName];
    var d = Dialog.show({
        visible: config.visible,
        onMaskClick: function () {
            if (typeof config.maskClosable == 'undefined' || config.maskClosable) {
                d.destroy();
                if (config.onCancel) {
                    config.onCancel();
                }
            }

        },
        style: config.style,
        wrapClassName: cls.join(' '),
        content: contentRender({
            title: config.title,
            content: config.content,
            bodyClass: config.bodyClass,
            footer: config.footer,
            cancelText: config.cancelText,
            okText: config.okText,
            onCancel: function () {
                d.destroy();
                if (config.onCancel) {
                    config.onCancel();
                }

            },
            onOk: function () {
                d.destroy();
                if (config.onOk) {
                    config.onOk();
                }

            }
        })
    });

    return d;
};
Modal.confirm = function (config: any) {
    var d = Modal.show({
        content: <div className='fp-confirm'>
            <span className='fp-confirm-icon'></span>
            <h3 className='fp-confirm-title'>
                {config.title}
            </h3>
            <div className='fp-confirm-text'>
                {config.content}
            </div>
            <div className='fp-confirm-btn'>
                <Button
                    onClick={function () {
                        // d.destroy();
                        if (config.onOk) {
                            config.onOk();
                        }

                    }}
                    size="sm"
                    style="primary"
                    noRadius={true}>
                    {config.okText || '确定'}
                </Button>
                {
                    config.hideCancelBtn ? null
                        : <Button
                            onClick={function () {
                                d.destroy();
                                if (config.onCancel) {
                                    config.onCancel();
                                }

                            }.bind(this)}
                            className='fp-modal-cancelBtn'
                            size="sm"
                            style="default"
                            noRadius={true}>
                            {config.cancelText || '取消'}
                        </Button>
                }


            </div>
        </div>,
        footer: null,
        style: config.style || { width: 400, height: 200 },
        maskClosable: config.maskClosable
    });
    return d;
};
function contentRender(config: any) {
    return <>
        {
            config.title ?
                <div className={'fp-modal-head'}>
                    <span>{config.title}</span>
                    <img src={closeImg} onClick={config.onCancel} />
                </div>
                : ''
        }
        <div className={['fp-modal-body', config.bodyClass].join(' ')}>{config.content}</div>
        {
            config.footer !== null ?
                <div className='fp-modal-foot'>
                    {config.footerText ? config.footerText : null}
                    <div className='fp-button-panel'>
                        {
                            config.okText === null ? ''
                                : <Button
                                    onClick={config.onOk}
                                    style="primary"
                                    noRadius={true}>
                                    {config.okText || '确定'}
                                </Button>
                        }
                        <Button
                            onClick={config.onCancel}
                            className='fp-modal-cancelBtn'
                            style="default"
                            noRadius={true}>
                            {config.cancelText || '取消'}
                        </Button>
                    </div>
                </div>
                : ''
        }
    </>;
}

export default Modal;
