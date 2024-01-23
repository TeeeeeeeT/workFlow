import React, { useState, useEffect } from 'react';
import { Frame } from 'cmao-ui';

import request from "umi-request";
import { history } from 'umi';

interface Props {
    children?: any;
}
const Temp = (props: Props) => {
    let [menu, setMenu] = useState<any>([]);

    useEffect(() => {
        getMenuTree();

        return () => { };
    }, []);

    const getMenuTree = () => {
        request
            .get("/api/v1/getMenuList")
            .then(function (response) {
                if (response.data) {
                    menu = response.data;
                    setMenu(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const clickMenu = (url: string) => {
        history.push(url)
    }

    return (
        <Frame
            menu={{ items: menu }}
            view={props.children}
            clickCallback={clickMenu}
        >
        </Frame>
        // <div>ddd</div>
    );
}
export default Temp;