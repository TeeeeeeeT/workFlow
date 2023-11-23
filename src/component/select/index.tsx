import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import Input from '../input/index';
import './module.scss';

/**
 * 使用方法：
 * <Select options={[
 *     {name: 'apple', value: 1}
 * ]} size="lg" wtype='1' disabled={true}/>
 *
 * size: 高度控制，不设置时默认为default高度，可设置为sm, lg
 * wtype: 宽度控制，不设置时自适应，可设置为1，2
 * disabled 属性为不可操作
 * filterable : 是否输入过滤选项
 * keyMap: { // 选项的key, 默认是 name, value, children
 *      name: '',
 *      value:'',
 *      children: ''
 * }
 * val: 选择的值
 * showTree: 显示树形结构的数据
 * clearable: 可清除已经选择的值
 * position：'', style的定位属性，用于调整下拉面板显示的问题
 * height:'100px',定义下拉框的高度
 *
 * 事件：
 *  onChange: (value)
 */

const _body = document.body;

let ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.DOCUMENT_NODE || + RegExp['\x241']) : 0;

const Temp = (props: any) => {
    let [showName, setShowName] = useState<any>();
    let [showOptions, setShowOptions] = useState<any>([]);
    let [filterable] = useState<any>();
    let [placeholder] = useState<any>();
    let [show, setShow] = useState<any>();
    let [pRect, setpRect] = useState<any>({
        right: 0,
        left: 0
    });
    let [top, setTop] = useState<any>();
    let [position] = useState<any>();
    let [totalOptions] = useState<any>();
    let [keyMap] = useState<any>();
    let [value, setValue] = useState<any>();

    const selectInputRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | any>(null);
    const inputItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    }, []);

    const onClick = (event: any) => {
        if (props.disabled) return;

        if (ie <= 9) {
            if (showName === '请选择') {
                setShowName('')
            }
        }

        // let parent = ReactDom.findDOMNode(selectInputRef.current);
        // let dropDown = ReactDom.findDOMNode(this.refs['dropdown']);

        pRect = selectInputRef.current?.getBoundingClientRect();

        let pHeight = pRect.bottom - pRect.top;

        show = !show;
        setShow(show);
        setpRect(pRect);
        if (show) {
            let dRect: any = dropdownRef.current?.getBoundingClientRect();

            let pBottom = _body.clientHeight - pRect.bottom; // 输入框到页面底部的距离
            let dropDownHeight = dRect.bottom - dRect.top;

            top = 0;
            // 下拉面板需要放在输入框上面
            if (pBottom < dropDownHeight && pRect.top >= dropDownHeight) {
                top = - (dropDownHeight + 12);
            } else {
                top = pHeight;
            }
            setTop(top);
        }
    }

    const filterOption = (e: any) => {
        let keyword = e.target.value;
        showOptions = keyword ? totalOptions.filter((item: any) => item[keyMap.name].match(keyword.replace(/\\/g, '\\\\'))) : totalOptions;

        setShowName(keyword);
        setShowOptions({ ...showOptions });
    }

    const handleClickItem = (item: any, event: any) => {
        // const { showMap, keyMap } = this.state;

        var newValue = item[keyMap.value];
        showName = item[keyMap.name];
        setShowName(showName);
        setValue(newValue);
        setShow(false);

        if (newValue != value) {
            props.onChange && props.onChange({
                target: {
                    name: props.name,
                    value: value
                }  // 这里为了兼容之前的select设置值的入参格式，没有办法了~
            });
        }

        // ReactDom.findDOMNode(inputItemRef).focus();
        inputItemRef.current?.focus();
    }

    const renderOption = (item: any, index: any) => {
        // const { name, value } = keyMap;
        return <li className={'fp-select-dropdown-item'} key={index}>
            <div className={"option-node" + (value == item[keyMap.value] ? ' selected' : '')}
                onClick={(e) => { handleClickItem(item, e) }}>
                <span>{item[keyMap.name]}</span>
            </div>
        </li>;
    }

    const { className, size, wtype, disabled, name, height } = props;
    let cls = ['fp-form-select', className];
    if (disabled) {
        cls.push('is-disabled');
    }
    return (<div className={cls.join(' ')} ref={selectInputRef}>
        <Input ref={inputItemRef}
            value={showName}
            readonly={!filterable}
            size={size}
            wtype={wtype}
            name={name}
            disabled={disabled}
            onClick={onClick}
            onChange={filterOption}
            placeholder={placeholder}
        />
        <i className={"fp-select-icon " + (show ? 'fp-up' : 'fp-down')} onClick={onClick}></i>
        <ul className="fp-select-dropdown" ref={dropdownRef} style={{
            width: pRect.right ? (pRect.right - pRect.left) : 0,
            minWidth: 120,
            height: height ? height : 'auto',
            position: position,
            top: position === 'absolute' ? top : null,
            display: show ? 'block' : 'none'
        }}>
            {showOptions.map((item: any, index: any) => renderOption(item, index))}
        </ul>
    </div>);
}

export default Temp;
