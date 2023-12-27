import React, { useState, useEffect } from 'react';
import Frame from '@/component/frame/frame';
import request from "umi-request";

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

    return (
        <Frame
            menu={{
                items: menu
            }}
            headMenu={{}}
            view={props.children}
        >
        </Frame>
    );
}
export default Temp;