import React, { useState, useEffect } from 'react';
import { Frame, Menu } from 'cmao-ui';
import request from '@/utils/request';
import { history, useLocation } from 'umi';

interface Props {
    children?: any;
}
const Temp = (props: Props) => {
    let [menu, setMenu] = useState<any>({ items: [], activeId: '' });
    const location = useLocation();
    useEffect(() => {
        getMenuTree();

        return () => { };
    }, []);

    const getMenuTree = () => {
        request({
            url: "/data/menu.json",
            method: 'get',
        }).then((res: any) => {
            if (res.code == 200) {
                let list = res.data;
                menu.items = list;
                setMenu({ ...menu });
            }
        }).catch((data) => {
        }).finally(() => {
            //根据url获取菜单id
            let list = menu.items || [];
            let id = getMenuIdByUrl(list, location.pathname);
            if (id) {
                setMenuSelect(id);
            }
        })
    }

    /**
     * 根据url递归菜单获取对应id
     * @param list 需要查询的菜单
     * @param url 指定url
     * @returns 返回对应id
     */
    const getMenuIdByUrl = (list: any, url: string) => {
        let id = '';
        list.forEach(function (o: any) {
            //
            if (o.children && o.children.length > 0) {
                let tmpId = getMenuIdByUrl(o.children, url);
                if (tmpId) {
                    id = tmpId;
                    return false;
                }
            }
            else {
                if (o.resUrl == url) {
                    id = o.resourceId;
                    return false;
                }
            }
        });
        return id;
    }

    /**点击菜单节点 触发事件 */
    const clickMenu = (obj: any) => {
        //没有子菜单才跳转页面
        if (!obj.children || obj.children.length == 0) {
            if (obj.resUrl) {
                history.push(obj.resUrl);
                setMenuSelect(obj.resourceId);
            }
        }
    }

    const setMenuSelect = (id: any) => {
        menu.activeId = id;
        setMenu({ ...menu });
    }

    return (<>
        {/* <Frame
            menu={menu}
            view={props.children}
            clickCallback={clickMenu}
        >
        </Frame> */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0 }}>
            <Menu data={menu.items} activeId={menu.activeId} clickCallback={clickMenu}></Menu>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 0, right: 0, bottom: 0 }}>
            {props.children}
        </div>
    </>
    );
}
export default Temp;