import Head from './head';
import Menu from './menu';
import './module.scss';

import React, { useState, useEffect } from 'react';

const Temp = (props: any) => {
    let [menu, setMenu] = useState<any>(props.menu.items);
    useEffect(() => {
        if (props.menu.items) {
            menu = props.menu.items;
            setMenu(props.menu.items)
        }

        return () => { };
    }, []);

    return (
        <div className='fp-page'>
            <Head menu={menu}
                activeId={props.headMenu.activeId}
            />
            <div className='fp-body clearfix'>
                <Menu data={props.menu.items} activeId={props.menu.activeId} />
                <div className='fp-container' id="J_container">
                    {props.view}
                </div>
            </div>
        </div>
    );
};

export default Temp;
