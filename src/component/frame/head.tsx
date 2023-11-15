import React, {
    useState,
} from 'react';

interface Menu {
    resType: string;
    children: Array<Menu>;
    resIcon: any,
    resUrl: any,
    resourceId: any,
    title: any
}
const Temp = (props: any) => {
    let [menu] = useState<Array<Menu>>(props.menu);

    const mouseover = (e: any) => {
        let down = e.currentTarget.querySelector('.fp-sub-menu');
        if (down) {
            down.style.display = 'block';
        }
    };

    const mouseout = (e: any) => {
        let down = e.currentTarget.querySelector('.fp-sub-menu');
        if (down) {
            down.style.display = 'none';
        }
    };

    return (
        <div className='fp-head'>
            <div className="fp-head-content">
                <div className="fp-headLogo">
                    <p>ttt<i></i></p>
                </div>
                <ul className="fp-head-menu">
                    {
                        menu.map((item, index) => {
                            if (item.resType !== '00' && item.resType !== '01') {
                                return null;
                            }
                            let showList = [];
                            if (item.children) {
                                showList = item.children.filter(o => {
                                    return o && o.resType == '00' || o.resType == '01';
                                });
                            }

                            return <li className="fp-head-menu-item"
                                onMouseOver={(e) => { mouseover(e) }}
                                onMouseOut={(e) => { mouseout(e) }}
                                key={index}>
                                <a href={showList.length > 0 ? 'javascript:;' : item.resUrl}
                                    className={'fp-menu-link'}>
                                    <span className={"fp-menu-icon-" + item.resIcon + (item.resourceId == props.activeId ? ' fp-menu-cur' : '')}>
                                        {(item.resourceId == "/resourceId/mine.html" && props.userName) ?
                                            (props.userName.length > 5 ? props.userName.substr(0, 5) + '...' : props.userName)
                                            : item.title
                                        }
                                    </span>
                                    {showList.length > 0 ? <i></i> : null}
                                </a>
                                {
                                    showList.length > 0 ?
                                        <ul className="fp-sub-menu">
                                            {
                                                item.children.map((ele, i) => {
                                                    return <li key={i}><a href={ele.resUrl}>{ele.title}</a></li>;
                                                })
                                            }
                                            {
                                                item.resourceId == "/resourceId/mine.html" ? <li className="fp-loginOut-btn"><a onClick={() => { props.logoutClick() }}>退出</a></li> : null
                                            }

                                        </ul>
                                        : null
                                }
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Temp;
