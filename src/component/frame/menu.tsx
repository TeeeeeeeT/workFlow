import React, { useState } from 'react';
import { Link } from 'umi';
import './module.scss';

interface Menu {
    resType?: string,
    children?: Array<Menu>,
    resIcon?: any,
    resUrl?: any,
    resourceId?: any,
    title?: any
}
interface Props {
    data: Array<Menu>,
    activeId: any
}
const Temp = (props: Props) => {
    let [openId, setOpenId] = useState<any>('');
    let [lock, setLock] = useState<boolean>(true);

    const handleMouseOver = (obj: any) => {
        setLock(false);
        openId = obj.resourceId;
        setOpenId(openId)
    }

    const handleMouseOut = () => {
        setLock(true);
        openId = '';
        setOpenId(openId)
    }

    // const handClick = (obj: any, len: number, e: any) => {
    //     e.preventDefault();
    //     if (!obj.children || len == 0) {
    //         if (obj.resUrl) {
    //             window.location.href = obj.resUrl;
    //         }
    //     }
    // }

    return (
        <div className='fp-menuWrap'>
            <ul className='fp-menu'>
                {
                    props.data.map((o, i) => {
                        let css = ['fp-menuItem'];
                        let subCss = ['fp-menuSecItems'];

                        let secList = new Array<Menu>();
                        if (o.children) {
                            o.children.forEach(item => {
                                if (item.resType == '00' || item.resType == '01') {
                                    secList.push(item);
                                }
                            });
                        }

                        // 判断当前一级菜单是否选中，选中则增加高亮样式
                        if (o.resourceId == props.activeId) {
                            css.push('cur');
                        }
                        if (openId == o.resourceId) {
                            css.push('cur');
                            if (!lock) {
                                subCss.push('fp-show');
                            }
                        }

                        // 渲染二级菜单
                        let secItems = secList.length > 0 ?
                            <div className={subCss.join(' ')}>
                                {secList.map((k, i) => {
                                    let cz = ['fp-menuSecItemsContent'];
                                    // 判断当前二级菜单是否选中
                                    if (k.resourceId == props.activeId) {
                                        // 给二级菜单增加高亮样式
                                        cz.push('fp-secCur');
                                    }
                                    // 判断是否是最后一个二级菜单，如果是，去除底部边框
                                    if (i == secList.length - 1) {
                                        // cz.push(c.last);
                                    }
                                    return <a href={k.resUrl} className={cz.join(' ')} key={i}>
                                        <div className='fp-menuSecText'>
                                            {k.title}
                                        </div>
                                    </a>;
                                })}
                            </div> : '';
                        // 渲染一级菜单，并将生成好的二级菜单插入
                        return <li className={css.join(' ')} style={{
                            width: '110px'
                        }}
                            onMouseOver={() => { handleMouseOver(o) }}
                            onMouseLeave={() => { handleMouseOut() }}
                            key={i}
                        >
                            {/* <a
                                // href={o.resUrl}
                                onClick={(e) => { handClick(o, secList.length, e) }}
                                className={'fp-menuContent' + (secList.length > 0 ? ' fp-menu-folder' : '')}>
                                <i className={'fp-menuIcon ' + 'fp-menuIcon-' + (o.resIcon || 'default')}></i>
                                <span className='fp-menuText'>
                                    {o.title}
                                </span>
                            </a> */}
                            <Link to={o.resUrl} className={'fp-menuContent' + (secList.length > 0 ? ' fp-menu-folder' : '')}>
                                <i className={'fp-menuIcon ' + 'fp-menuIcon-' + (o.resIcon || 'default')}></i>
                                <span className='fp-menuText'>
                                    {o.title}
                                </span>
                            </Link>
                            {secItems}
                        </li>;
                    })
                }
            </ul>
        </div>
    );
};

export default Temp;
