import React, { useEffect, useRef, useState } from 'react';
import './module.scss';

let tempOp: any = {};
interface Props {
    id?: string;
    children?: any;
}
/**
 * 滚动条组件， 可以自动匹配高度框架，生成滚动条。
 * 要求 1.子元素高宽比本组件大
 * @param props 
 * @returns 
 */
const Temp = (props: Props) => {
    let [id, setId] = useState(props.id);
    let [op, setOp] = useState<any>({});
    let [scrollStyle, setScrollStyle] = useState<any>({});
    let [verticalStyle, setVerticalStyle] = useState<any>({});
    let [verticalBlockClass, setVerticalBlockClass] = useState<any>([]);
    let [verticalBlockStyle, setVerticalBlockStyle] = useState<any>([]);
    let [horizontalStyle, setHorizontalStyle] = useState<any>({});
    let [horizontalBlockStyle, setHorizontalBlockStyle] = useState<any>({});
    let [horizontalBlockClass, setHorizontalBlockClass] = useState<any>(
        [],
    );

    let [moveStyle, setMoveStyle] = useState<any>({});

    const $wrap = useRef<HTMLDivElement | null>(null); //最外层的容器，它的高度宽度是100%，根据该组件所位于的div样式决定
    const $scroll = useRef<HTMLDivElement | null>(null); //用于滚动的容器，它的高度宽度是根据子组件来决定，一般比最外层容器大，所以才需要滚动
    const $move = useRef<HTMLDivElement | null>(null); //移动板的容器

    useEffect(() => {
        if (!id) {
            id = 'lr_' + newGuid();
            setId(id);
        }

        let sh = $scroll.current?.clientHeight; //获取的是包含scroll包含children组件的高度
        let sw = $scroll.current?.clientWidth;

        let h = $wrap.current?.clientHeight;
        let w = $wrap.current?.clientWidth;
        op = {
            id: id,
            sy: 0,
            sx: 0,
            sh: sh,
            sw: sw,
            h: h,
            w: w,
            yh: 0,
            xw: 0,
            // blockX: 0,
            // blockY: 0,
            callback: function () { },
        };
        setOp({ ...op });

        update();

        moveStyle = {
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            cursor: 'pointer',
        };
        setMoveStyle({ ...moveStyle });
        verticalBlockClass = ['lr-scroll-vertical-block'];
        setVerticalBlockClass([...verticalBlockClass]);
        horizontalBlockClass = ['lr-scroll-horizontal-block'];
        setHorizontalBlockClass([...horizontalBlockClass]);

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === $wrap.current) {
                    let shh = $scroll.current?.clientHeight;
                    let sww = $scroll.current?.clientWidth;
                    op.sh = tempOp.sh || shh;
                    op.sw = tempOp.sw || sww;
                    op.blockX = tempOp.blockX;
                    op.blockY = tempOp.blockY;
                    op.sy = tempOp.sy || 0;
                    op.sx = tempOp.sx || 0;

                    scrollWrapOnresize();
                }
            }
        })

        if ($wrap.current) {
            resizeObserver.observe($wrap.current)
        }

        return () => {
            if ($wrap.current) {
                resizeObserver.unobserve($wrap.current)
            }
        }

    }, []);

    const newGuid = () => {
        let guid = '';
        for (let i = 1; i <= 32; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += '-';
        }
        return guid;
    };

    // 监听鼠标移动
    const verticalBlockMousedown = (e: any) => {
        let newCss: any = {};
        Object.assign(newCss, moveStyle);
        newCss.display = 'block';
        setMoveStyle({ ...newCss });

        op.isYMousedown = true;
        op.yMousedown = e.pageY;
        setOp({ ...op });

        verticalBlockClass.push('lr-scroll-active');
        setVerticalBlockClass([...verticalBlockClass]);
    };

    const horizontalBlockMousedown = (e: any) => {
        let newCss: any = {};
        Object.assign(newCss, moveStyle);
        newCss.display = 'block';
        setMoveStyle({ ...newCss });

        op.isXMousedown = true;
        op.xMousedown = e.pageX;
        setOp({ ...op });
        horizontalBlockClass.push('lr-scroll-active');
        setHorizontalBlockClass([...horizontalBlockClass]);
    };

    const wrapMousemove = (e: any) => {
        if (op.isYMousedown) {
            let y = e.pageY;
            let _yd = y - op.yMousedown;
            op.yMousedown = y;
            op.oldsy = op.sy;
            op.blockY = op.blockY + _yd;

            if (op.blockY + op.yh > op.h) {
                op.blockY = op.h - op.yh;
            }
            if (op.blockY < 0) {
                op.blockY = 0;
            }
            getY();
            moveY(true, true);
        } else if (op.isXMousedown) {
            let x = e.pageX;
            let _xd = x - op.xMousedown;
            op.xMousedown = x;
            op.oldsx = op.sx;
            op.blockX = op.blockX + _xd;
            if (op.blockX + op.xw > op.w) {
                op.blockX = op.w - op.xw;
            }
            if (op.blockX < 0) {
                op.blockX = 0;
            }
            getX();
            moveX(false);
        }
    };

    const wrapMouseup = () => {
        op.isYMousedown = false;
        op.isXMousedown = false;
        setOp({ ...op });

        let newCss: any = {};
        Object.assign(newCss, moveStyle);
        newCss.display = 'none';
        setMoveStyle({ ...newCss });
    };

    const scrollWrapOnresize = () => {
        if (op) {
            let h = $wrap.current?.clientHeight;
            let w = $wrap.current?.clientWidth;

            if (h != op.h) {
                op.h = h;
                updateY();
            }
            if (w != op.w) {
                op.w = w;
                updateX();
            }
        }
    };

    const scrollBoxOnresize = () => {
        if (op) {
            let sh = $scroll.current?.clientHeight;
            let sw = $scroll.current?.clientWidth;

            if (sh != op.sh) {
                op.sh = sh;
                updateY();
            }
            if (sw != op.sw) {
                op.sw = sw;
                updateX();
            }
        }
    };

    // 监听鼠标滚动
    const wrapOnMousewheel = (e: any) => {
        if (op.sh > op.h) {
            var delta = e.deltaY < 0 ? 1 : -1;
            var d = delta * 30
            op.oldsy = op.sy;
            op.sy = op.sy - d;
            moveY(true, true);
            if (op.h + op.sy < op.sh && op.sy > 0) {
                return false;
            }
        } else if (op.sw > op.w) {
            var delta = e.deltaX < 0 ? 1 : -1;
            var d = delta * 30
            op.oldsx = op.sx;
            op.sx = op.sx - d;
            moveX(true);
            return false;
        }
    };

    const update = () => {
        // 更新滚动条
        updateY();
        updateX();
    };

    const updateY = () => {
        if (op.sh > op.h) {
            // 出现纵向滚动条
            // 更新显示区域位置
            if (op.sh - op.sy < op.h) {
                let _sy = 0;
                op.sy = op.sh - op.h;
                if (op.sy < 0) {
                    op.sy = 0;
                } else {
                    _sy = 0 - op.sy;
                }

                let newCss: any = {};
                Object.assign(newCss, scrollStyle);
                newCss.top = _sy;
                setScrollStyle({ ...newCss });
            }
            // 更新滚动条高度
            let scrollH = (op.h * op.h) / op.sh;
            scrollH = scrollH < 30 ? 30 : scrollH;
            op.yh = scrollH;

            // 更新滚动条位置
            let _y = (op.sy * (op.h - scrollH)) / (op.sh - op.h);
            if (_y + scrollH > op.h) {
                _y = op.h - scrollH;
            }
            if (_y < 0) {
                _y = 0;
            }

            op.blockY = _y;

            // 设置滚动块大小和位置
            let newCss: any = {};
            Object.assign(newCss, verticalBlockStyle);
            newCss.top = _y;
            newCss.height = scrollH;
            setVerticalBlockStyle({ ...newCss });
        } else {
            op.blockY = 0;
            op.sy = 0;

            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.top = 0;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss2, verticalBlockStyle);
            newCss2.top = 0;
            newCss2.height = 0;
            setVerticalBlockStyle({ ...newCss2 });
        }

        if (op.callback) {
            op.callback(op.sx, op.sy);
        }

        setOp({ ...op });
    };

    const updateX = () => {
        if (op.sw > op.w) {
            // 更新显示区域位置
            if (op.sw - op.sx < op.w) {
                let _sx = 0;
                op.sx = op.sw - op.w;
                if (op.sx < 0) {
                    op.sx = 0;
                } else {
                    _sx = 0 - op.sx;
                }

                let newCss: any = {};
                Object.assign(newCss, scrollStyle);
                newCss.left = _sx;
                setScrollStyle({ ...newCss });
            }
            // 更新滚动条高度
            let scrollW = (op.w * op.w) / op.sw;
            scrollW = scrollW < 30 ? 30 : scrollW;
            op.xw = scrollW;

            // 更新滚动条位置
            let _x = (op.sx * (op.w - scrollW)) / (op.sw - op.w);
            if (_x + scrollW > op.w) {
                _x = op.w - scrollW;
            }
            if (_x < 0) {
                _x = 0;
            }
            op.blockX = _x;
            // 设置滚动块大小和位置
            let newCss: any = {};
            Object.assign(newCss, horizontalBlockStyle);
            newCss.left = _x;
            newCss.width = scrollW;
            setHorizontalBlockStyle({ ...newCss });
        } else {
            op.sx = 0;
            op.blockX = 0;

            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.left = 0;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss, horizontalBlockStyle);
            newCss2.left = 0;
            newCss2.width = 0;
            setHorizontalBlockStyle({ ...newCss2 });
        }
        if (op.callback) {
            op.callback(op.sx, op.sy);
        }
        setOp({ ...op });
    };

    const moveY = (isMousewheel: any, isCallBack: any) => {
        // 更新显示区域位置
        let _sy = 0;
        if (op.sy < 0) {
            op.sy = 0;
        } else if (op.sy + op.h > op.sh) {
            op.sy = op.sh - op.h;
            _sy = 0 - op.sy;
        } else {
            _sy = 0 - op.sy;
        }
        if (isMousewheel) {
            let _y = getBlockY();
            if (_y == 0 && op.sy != 0) {
                op.sy = 0;
                _sy = 0;
            }
            op.blockY = _y;
            // 设置滚动块位置
            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.top = _sy;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss2, verticalBlockStyle);
            newCss2.top = _y;
            setVerticalBlockStyle({ ...newCss2 });
        } else {
            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.top = _sy;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss2, verticalBlockStyle);
            newCss2.top = op.blockY;
            setVerticalBlockStyle({ ...newCss2 });
        }
        if (isCallBack && op.callback) {
            op.callback(op.sx, op.sy);
        }
        tempOp = { ...op };
    };

    const moveX = (isMousewheel: any) => {
        // 更新显示区域位置
        let _sx = 0;
        if (op.sx < 0) {
            op.sx = 0;
        } else if (op.sx + op.w > op.sw) {
            op.sx = op.sw - op.w;
            _sx = 0 - op.sx;
        } else {
            _sx = 0 - op.sx;
        }

        if (isMousewheel) {
            // 更新滑块的位置
            let _x = getBlockX();
            if (_x == 0 && op.sx != 0) {
                op.sx = 0;
                _sx = 0;
            }
            op.blockX = _x;
            // 设置滚动块位置
            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.left = _sx;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss2, horizontalBlockStyle);
            newCss2.left = _x;
            setHorizontalBlockStyle({ ...newCss2 });
        } else {
            let newCss: any = {};
            Object.assign(newCss, scrollStyle);
            newCss.left = _sx;
            setScrollStyle({ ...newCss });

            let newCss2: any = {};
            Object.assign(newCss2, horizontalBlockStyle);
            newCss2.left = op.blockX;
            setHorizontalBlockStyle({ ...newCss2 });
        }
        if (op.callback) {
            op.callback(op.sx, op.sy);
        }
        tempOp = { ...op };
    };

    const getBlockY = () => {
        let _y = (op.sy * (op.h - op.yh)) / (op.sh - op.h);
        if (_y + op.yh > op.h) {
            _y = op.h - op.yh;
        }
        if (_y < 0) {
            _y = 0;
        }
        return _y;
    };

    const getY = () => {
        op.sy = (op.blockY * (op.sh - op.h)) / (op.h - op.yh);
        if (op.sy + op.h > op.sh) {
            op.sy = op.sh - op.h;
        }
        if (op.sy < 0) {
            op.sy = 0;
        }
    };

    const getBlockX = () => {
        let _x = (op.sx * (op.w - op.xw)) / (op.sw - op.w);
        if (_x + op.xw > op.w) {
            _x = op.w - op.xw;
        }
        if (_x < 0) {
            _x = 0;
        }
        return _x;
    };

    const getX = () => {
        op.sx = (op.blockX * (op.sw - op.w)) / (op.w - op.xw);
        if (op.sx + op.w > op.sw) {
            op.sx = op.sw - op.w;
        }
        if (op.sx < 0) {
            op.sx = 0;
        }
    };

    return (<>
        <div className="lr-scroll-wrap" ref={$wrap}
            onMouseMove={(e) => { wrapMousemove(e); }}
            onMouseUp={() => { wrapMouseup(); }}
            onWheel={(e) => { wrapOnMousewheel(e); }}>
            <div className="lr-scroll-box" id={id + '_box'} style={scrollStyle} ref={$scroll} >
                {props.children}
            </div>
            {/* 加载y滚动条 */}
            <div className="lr-scroll-vertical" style={verticalStyle}>
                <div
                    className={verticalBlockClass.join(' ')}
                    id={id + '_vertical'}
                    style={verticalBlockStyle}
                    onMouseDown={(e) => {
                        verticalBlockMousedown(e);
                    }}
                ></div>
            </div>
            {/* 加载x滚动条 */}
            <div className="lr-scroll-horizontal" style={horizontalStyle}>
                <div
                    className={horizontalBlockClass.join(' ')}
                    id={id + '_horizontal'}
                    style={horizontalBlockStyle}
                    onMouseDown={(e) => {
                        horizontalBlockMousedown(e);
                    }}
                ></div>
            </div>
            {/* 添加一个移动板 */}
            <div style={moveStyle} ref={$move}></div>
        </div>
    </>);
}


export default Temp;
