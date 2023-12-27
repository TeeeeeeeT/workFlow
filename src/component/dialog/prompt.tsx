import React from 'react';

import factory from './factory';
import './module.scss';

/**
 * 使用方法：
 * Prompt.success('success');
 * Prompt.error('error');
 * Prompt.warn('warning');
 */

function BasePrompt(this: any, duration: any) {
    this.controller = factory("__cnki_fireplug_prompt__", "cnki-fireplug-prompt");
    this.list = [];
    this.timer = null;
    this.duration = duration;
}

BasePrompt.prototype.render = function (config: any) {
    this.controller.renderDialog({
        visible: 1,
        wrapClassName: 'fp-prompt',
        mask: config.mask,
        content: <ul className='fp-prompt-items'>
            {
                this.list.map(function (d: any, i: any) {
                    return <li key={d.id}>
                        <span className='fp-prompt-content'>
                            <i className={'fp-' + (d.icon || 'info') + '-icon'}></i>
                            <span className='fp-prompt-text'>{d.content}</span>
                        </span>
                    </li>;
                })
            }
        </ul>
    });
};


BasePrompt.prototype.add = function (item: any) {

    /* item:{
        id:'',
        content:'',
        duration:duration
    } */
    if (!item) {
        return;
    }

    var id = item.id;
    this.list.push(item);

    this.render({
        mask: item.mask
    });

    if (item.duration != -1) {
        //延时移除弹窗
        setTimeout(() => {
            removeItem(this.list, id);
            // this.render({
            //     mask: this.list.length == 0 ? false : true
            // });
            this.render({
                mask: item.mask
            });
        }, item.duration || this.duration);
    }

    return {
        destroy: () => {
            removeItem(this.list, id);
            this.render({
                mask: this.list.length == 0 ? false : true
            });
        }
    };

};
function removeItem(arr: any[], id: any) {
    var e = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            e = i;
            break;
        }

    }
    arr.splice(e, 1);
    return arr;
}

BasePrompt.prototype.clearAll = function () {
    this.list = [];

    this.render({
        mask: false
    });
}


var base = new (BasePrompt as any)(2000);

export default {
    error: function (content: any, duration: any = 2000) {
        return base.add({
            id: new Date().getTime() / 100000 + '' + 100 * Math.random(),
            icon: 'error',
            content: content,
            duration: duration || 2000
        });
    },
    warn: function (content: any, duration: any = 1500) {
        return base.add({
            id: new Date().getTime() / 100000 + '' + 100 * Math.random(),
            icon: 'warn',
            content: content,
            duration: duration || 1500
        });
    },
    success: function (content: any, duration: any = 1500) {
        return base.add({
            id: new Date().getTime() / 100000 + '' + 100 * Math.random(),
            icon: 'success',
            content: content,
            duration: duration || 1500
        });
    },
    loading: function (content: any = null) {
        return base.add({
            id: new Date().getTime() / 100000 + '' + 100 * Math.random(),
            icon: 'loading',
            content: content || '正在加载，请稍后...',
            duration: -1,
            mask: true
        });
    }
};

/**清除所有提示 */
export function clearPrompt() {
    base.clearAll();
}