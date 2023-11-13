import React, { useEffect, useRef, useState } from 'react';
import './module.scss';

interface Props {
  id?: string;
  children?: any;
}
const Temp: React.FC<Props> = (props) => {
  let [id, setId] = useState(props.id);
  let [op, setOp] = useState<any>({});
  let [scrollStyle, setScrollStyle] = useState<any>({});
  let [verticalStyle, setVerticalStyle] = useState<any>({});
  let [verticalBlockClass, setVerticalBlockClass] = useState<any>([]);
  let [horizontalStyle, setHorizontalStyle] = useState<any>({});
  let [horizontalStyleBlockClass, setHorizontalStyleBlockClass] = useState<any>(
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

    // $this.addClass('lr-scroll-wrap');
    // // 加载内容
    // var $content = $this.children();

    // var $scroll = $('<div class="lr-scroll-box" id="' + id + '_box" ></div>');
    // $this.append($scroll);
    // $scroll.append($content);

    // // 加载y滚动条
    // var $vertical = $('<div class="lr-scroll-vertical"   ><div class="lr-scroll-vertical-block" id="' + id + '_vertical"></div></div>')
    // $this.append($vertical);

    // // 加载x滚动条
    // var $horizontal = $('<div class="lr-scroll-horizontal" ><div class="lr-scroll-horizontal-block" id="' + id + '_horizontal"></div></div>')
    // $this.append($horizontal);

    // // 添加一个移动板
    // if ($move === null) {
    //     $move = $('<div style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;cursor: pointer;" ></div>');
    //     $('body').append($move);
    // }
    // 初始化数据
    //innerHeight

    let sh = $scroll.current?.clientHeight; //获取的是包含scroll包含children组件的高度
    let sw = $scroll.current?.clientWidth;

    console.log('$scroll.current', $scroll.current);
    console.log('sh', sh);
    console.log('sw', sw);

    // console.log(props.children);
    // console.log(props.children.current);

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
      callback: function () {},
    };
    setOp({ ...op });
    // $this[0].op = data;
    // methods.update($this);
    // methods.bindEvent($this, $scroll, $vertical, $horizontal);

    update();
    // bindEvent();

    // $scroll = null;
    // $content = null;
    // $vertical = null;
    // $horizontal = null;
    // $this = null;

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
    horizontalStyleBlockClass = ['lr-scroll-horizontal-block'];
    setHorizontalStyleBlockClass([...horizontalStyleBlockClass]);
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
    console.log('verticalBlockMousedown');
    // $move.show();
    moveStyle.display = 'block';
    setMoveStyle({ ...moveStyle });

    // var $this = $(this).parent().parent();
    // var op = $this[0].op;
    op.isYMousedown = true;
    op.yMousedown = e.pageY;
    setOp({ ...op });
    // $this.addClass('lr-scroll-active');
    verticalBlockClass.push('lr-scroll-active');
    setVerticalBlockClass([...verticalBlockClass]);

    // $this = null;
  };

  const horizontalBlockMousedown = (e: any) => {
    console.log('horizontalBlockMousedown');
    // $move.show();
    moveStyle.display = 'block';
    setMoveStyle({ ...moveStyle });
    // var $this = $(this).parent().parent();
    // var op = $this[0].op;
    op.isXMousedown = true;
    op.xMousedown = e.pageX;
    setOp({ ...op });
    // $this.addClass('lr-scroll-active');
    horizontalStyleBlockClass.push('lr-scroll-active');
    setHorizontalStyleBlockClass([...horizontalStyleBlockClass]);
    // $this = null;
  };

  const wrapMousemove = (e: any) => {
    if (op.isYMousedown) {
      // var $select = e.data.$obj.find('.lr-select-focus');
      // if ($select.length > 0) {
      //     var selectId = "learun_select_option_" + $select.attr('id');
      //     $('#' + selectId).slideUp(150);
      //     $select.removeClass('lr-select-focus');
      // }

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
      // var $select = e.data.$obj.find('.lr-select-focus');
      // if ($select.length > 0) {
      //     var selectId = "learun_select_option_" + $select.attr('id');
      //     $('#' + selectId).slideUp(150);
      //     $select.removeClass('lr-select-focus');
      // }

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
      moveX(e.data.$obj);
    }
  };

  const wrapMouseup = () => {
    // e.data.$obj[0].op.isYMousedown = false;
    // e.data.$obj[0].op.isXMousedown = false;
    op.isYMousedown = false;
    op.isXMousedown = false;
    setOp({ ...op });
    // $move.hide();
    // e.data.$obj.removeClass('lr-scroll-active');
  };

  const scrollOnresize = () => {
    if (op) {
      // var sh = $this.innerHeight();
      // var sw = $this.innerWidth();
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
  const scrollOnMousewheel = (e: any) => {
    console.log(e);
    // var $this = $(this);
    // var $select = $this.find('.lr-select-focus');
    // if ($select.length > 0) {
    //     var selectId = "learun_select_option_" + $select.attr('id');
    //     $('#' + selectId).slideUp(150);
    //     $select.removeClass('lr-select-focus');
    // }

    // var _v = 4 + (Math.abs(delta) - 1) * 0.1 * e.deltaFactor;
    // if (_v > 16 && _v < 300) {
    //     _v = 36;
    // }
    // else if (_v >= 300) {
    //     _v = 40;
    // }

    // var op = $this[0].op;
    // var d = delta * 30;// var d = delta * 20;
    // if (op.sh > op.h) {
    //     op.oldsy = op.sy;
    //     op.sy = op.sy - d;
    //     setTimeout(function () {
    //         methods.moveY($this, true, true);
    //         $this = null;
    //     });
    //     if (op.h + op.sy < op.sh && op.sy > 0) {
    //         return false;
    //     }
    // } else if (op.sw > op.w) {
    //     op.oldsx = op.sx;
    //     op.sx = op.sx - d;
    //     setTimeout(function () {
    //         methods.moveX($this, true);
    //         $this = null;
    //     });
    //     return false;
    // }
  };

  const update = () => {
    // 更新滚动条
    updateY();
    updateX();
  };

  const updateY = () => {
    // var op = $this[0].op;
    // var $scroll = $this.find('#' + op.id + '_box');
    // var $vertical = $this.find('#' + op.id + '_vertical');
    console.log('updateY');
    console.log('op.sh', op.sh);
    console.log('op.h', op.h);
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
        // $scroll.css('top', _sy + 'px');
        let newCss: any = {};
        Object.assign(newCss, scrollStyle);
        newCss.top = _sy;
        setScrollStyle({ ...newCss });
      }
      // 更新滚动条高度
      // var scrollH = parseInt(op.h * op.h / op.sh);
      let scrollH = (op.h * op.h) / op.sh;
      scrollH = scrollH < 30 ? 30 : scrollH;
      op.yh = scrollH;

      // 更新滚动条位置
      // var _y = parseInt(op.sy * (op.h - scrollH) / (op.sh - op.h));
      let _y = (op.sy * (op.h - scrollH)) / (op.sh - op.h);
      if (_y + scrollH > op.h) {
        _y = op.h - scrollH;
      }
      if (_y < 0) {
        _y = 0;
      }

      op.blockY = _y;

      // 设置滚动块大小和位置
      // $vertical.css({
      //     'top': _y + 'px',
      //     'height': scrollH + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, verticalStyle);
      newCss.top = _y;
      newCss.height = scrollH;
      setVerticalStyle({ ...newCss });
    } else {
      op.blockY = 0;
      op.sy = 0;
      // $scroll.css('top', '0px');
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.top = 0;
      setScrollStyle({ ...newCss });
      // $vertical.css({
      //     'top': '0px',
      //     'height': '0px'
      // });
      let newCss2: any = {};
      Object.assign(newCss2, verticalStyle);
      newCss2.top = 0;
      newCss2.height = 0;
      setVerticalStyle({ ...newCss2 });
    }

    if (op.callback) {
      op.callback(op.sx, op.sy);
    }
    // $scroll = null;
    // $vertical = null;
  };

  const updateX = () => {
    // var op = $this[0].op;
    // var $scroll = $this.find('#' + op.id + '_box');
    // var $horizontal = $this.find('#' + op.id + '_horizontal');
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
        // $scroll.css('left', _sx + 'px');
        let newCss: any = {};
        Object.assign(newCss, scrollStyle);
        newCss.left = _sx;
        setScrollStyle({ ...newCss });
      }
      // 更新滚动条高度
      // var scrollW = parseInt(op.w * op.w / op.sw);
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
      // $horizontal.css({
      //     'left': _x + 'px',
      //     'width': scrollW + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, horizontalStyle);
      newCss.left = _x;
      newCss.width = scrollW;
      setHorizontalStyle({ ...newCss });
    } else {
      op.sx = 0;
      op.blockX = 0;
      // $scroll.css('left', '0px');
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.left = 0;
      setScrollStyle({ ...newCss });
      // $horizontal.css({
      //     'left': '0px',
      //     'width': '0px'
      // });
      let newCss2: any = {};
      Object.assign(newCss, horizontalStyle);
      newCss2.left = 0;
      newCss2.width = 0;
      setHorizontalStyle({ ...newCss2 });
    }
    if (op.callback) {
      op.callback(op.sx, op.sy);
    }
    // $scroll = null;
    // $horizontal = null;
  };

  const moveY = (isMousewheel: any, isCallBack: any) => {
    console.log('moveY');
    // var op = $this[0].op;
    // var $scroll = $this.find('#' + op.id + '_box');
    // var $vertical = $this.find('#' + op.id + '_vertical');

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
      let _y = getBlockY(op);
      if (_y == 0 && op.sy != 0) {
        op.sy = 0;
        _sy = 0;
      }
      op.blockY = _y;
      // 设置滚动块位置
      //var d = Math.abs(op.sy - op.oldsy) * 100 / 4;
      // $scroll.css({
      //     'top': _sy + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.top = _sy;
      setScrollStyle({ ...newCss });
      // $vertical.css({
      //     'top': _y + 'px'
      // });
      let newCss2: any = {};
      Object.assign(newCss2, verticalStyle);
      newCss2.top = _y;
      setScrollStyle({ ...newCss2 });
    } else {
      // $scroll.css({
      //     'top': _sy + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.top = _sy;
      setScrollStyle({ ...newCss });
      // $vertical.css({
      //     'top': op.blockY + 'px'
      // });
      let newCss2: any = {};
      Object.assign(newCss2, verticalStyle);
      newCss2.top = op.blockY;
      setVerticalStyle({ ...newCss2 });
    }
    if (isCallBack && op.callback) {
      op.callback(op.sx, op.sy);
    }
    // $scroll = null;
    // $vertical = null;
  };

  const moveX = (isMousewheel: any) => {
    // var op = $this[0].op;
    // var $scroll = $this.find('#' + op.id + '_box');
    // var $horizontal = $this.find('#' + op.id + '_horizontal');

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

    console.log('isMousewheel', isMousewheel);
    if (isMousewheel) {
      // 更新滑块的位置
      let _x = getBlockX();
      if (_x == 0 && op.sx != 0) {
        op.sx = 0;
        _sx = 0;
      }
      op.blockX = _x;
      // 设置滚动块位置
      // $scroll.css({
      //     'left': _sx + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.left = _sx;
      setScrollStyle({ ...newCss });
      console.log('scrollStyle', newCss);
      // $horizontal.css({
      //     'left': _x + 'px'
      // });
      let newCss2: any = {};
      Object.assign(newCss2, verticalStyle);
      newCss2.left = _x;
      setVerticalStyle({ ...newCss2 });
      console.log('verticalStyle', newCss2);
    } else {
      // $scroll.css({
      //     'left': _sx + 'px'
      // });
      let newCss: any = {};
      Object.assign(newCss, scrollStyle);
      newCss.left = _sx;
      setScrollStyle({ ...newCss });
      // $horizontal.css({
      //     'left': op.blockX + 'px'
      // });
      let newCss2: any = {};
      Object.assign(newCss2, verticalStyle);
      newCss2.left = op.blockX;
      setVerticalStyle({ ...newCss2 });
    }
    if (op.callback) {
      op.callback(op.sx, op.sy);
    }
    // op.callback && op.callback(op.sx, op.sy);
    // $scroll = null;
    // $horizontal = null;
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
    setOp({ ...op });
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

  return (
    <>
      <div
        className="lr-scroll-wrap"
        ref={$wrap}
        onMouseMove={(e) => {
          wrapMousemove(e);
        }}
        onMouseUp={() => {
          wrapMouseup();
        }}
      >
        <div
          className="lr-scroll-box"
          id={id + '_box'}
          style={scrollStyle}
          ref={$scroll}
          onResize={() => {
            scrollOnresize();
          }}
          onScroll={(e) => {
            scrollOnMousewheel(e);
          }}
        >
          {props.children}
        </div>
        {/* 加载y滚动条 */}
        <div className="lr-scroll-vertical" style={verticalStyle}>
          <div
            className={verticalBlockClass.join(' ')}
            id={id + '_vertical'}
            onMouseDown={(e) => {
              verticalBlockMousedown(e);
            }}
          ></div>
        </div>
        {/* 加载x滚动条 */}
        <div className="lr-scroll-horizontal" style={horizontalStyle}>
          <div
            className={horizontalStyleBlockClass.join(' ')}
            id={id + '_horizontal'}
            onMouseDown={(e) => {
              horizontalBlockMousedown(e);
            }}
          ></div>
        </div>
        {/* 添加一个移动板 */}
        <div style={moveStyle} ref={$move}></div>
      </div>
    </>
  );
};

export default Temp;
