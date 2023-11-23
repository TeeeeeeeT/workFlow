import React, { useEffect, useState } from 'react';
import './module.scss';

const Temp = (props: any) => {
    useEffect(() => {
    }, []);

    const onActiveChange = (index: any) => {
        index != props.active && props.onChange(index);
    }

    var cls = ['fp-tabPage', props.className];
    var nav = props.nav || [];
    var width = props.width || 80;
    return (<div className={cls.join(' ')}>
        <div className="fp-tabpage-nav tClear">
            {
                nav.map(function (item: any, index: any, arr: any) {
                    let cls = ['fp-tab-item-wrap'];
                    if (index == props.active) {
                        cls.push('fp-tab-active');
                    }
                    if (index == nav.length - 1) {
                        cls.push('fp-last-item');
                    }
                    return <div className={cls.join(' ')} key={index}>
                        <strong onClick={() => { onActiveChange(index) }}
                            style={{ width: width }}>
                            {item}
                        </strong>
                    </div>;
                })
            }
        </div>
        <div className='fp-tabPage-box'>
            {
                React.Children.map(props.children, function (child, index) {
                    return (
                        <div className={index == props.active ? '' : 'fp-tab-isHidden'}>
                            {child}
                        </div>
                    );
                })
            }
        </div>
    </div>);
}

export default Temp;
