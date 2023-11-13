import React, {
  MouseEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import action from './store/action';
// const Node = require('./node');

interface Node {
  id?: string;
  name?: string;
  left?: number;
  top?: number;
  type?: string;
  isShowNodeico?: boolean;
  css?: Record<string, any>;
  isShowNodeclose?: boolean;
  className?: Array<string>;
  bClassName?: string;
  width?: number;
  height?: number;
  history?: Array<NodeHistory>;
  state?: string;
  wfForms?: Array<string>;
  auditors?: Array<string>;
  btnlist?: Array<string>;
  conditions?: Array<string>;
}
interface NodeHistory {
  createUserName?: string;
  namelist?: string;
}

interface Line {
  id?: string;
  marked?: boolean;
  $line: any;
  color?: string;
  from?: string;
  to?: string;
  type?: string;
  M?: number;
  sp?: string;
  ep?: string;
  mark?: string;
}
// interface Line$line {
//     // path?: { stroke: string; markerEnd: string; d?: string; };
//     path?: any;
//     hi?: any;
//     text?: any;
//     from?: string;
//     to?: string;
// }

interface Props {
  id: string;
  isPreview?: boolean;
  currentBtn?: string;
  nodeRemarks: Record<string, any>;
  changeCurrentBtn?: (arg0: string) => void;
  $nowType?: string;
  ref?: any;
}
//
const Temp: React.FC<Props> = forwardRef((props, ref) => {
  let [focusId, setFocusId] = useState(''); //选中要素的id
  let [focusType, setFocusType] = useState(''); //选中要素的type（node或line）
  let [hasStartround, setHasStartround] = useState(false); //是否存在开始节点
  let [hasEndround, setHasEndround] = useState(false); //是否存在结束节点
  let [nodes, setNodes] = useState<Array<Node>>([]); //存放用于显示的node节点
  let [ghost, setGhost] = useState<any>({
    isShow: false,
    name: '',
  }); //存放拖动虚影对象
  let [lineStart, setLineStart] = useState<any>({ x: 0, y: 0 }); //
  let [lines, setLines] = useState<Array<Line>>([]); //存放线 存放样式
  // let [polys, setPolys] = useState([]);                   //存放折线
  let [lineMove, setLineMove] = useState<any>({ css: { display: 'none' } });
  let [lineOper, setLineOper] = useState<any>({ css: { display: 'none' } });

  const $workArea = useRef<HTMLDivElement | null>(null); //创建一个容器
  const $linemover = useRef<HTMLDivElement | null>(null); //创建一个容器

  // 将外部需要访问的属性和方法暴露出去
  useImperativeHandle(ref, () => ({
    nodes,
    lines,
    setNodes,
    setLines,
    addNode,
    addLine,
  }));

  const newGuid = () => {
    let guid = '';
    for (let i = 1; i <= 32; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20) guid += '-';
    }
    return guid;
  };

  //点击画布区域
  const clickWorkArea = (
    eee: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    let dfop = props;
    if (!dfop.isPreview) {
      let e = eee || window.event;

      let type = dfop.currentBtn;
      if (type == 'cursor') {
        let n = (e.target as HTMLElement).tagName;
        if (n == 'svg' || n == 'DIV') {
          blurItem();
        }
        return;
      } else if (type == 'direct') {
        return;
      }
      let X, Y;
      let ev = mousePosition(e),
        t = getElCoordinate(e.currentTarget);

      X = ev.x - t.left;
      Y = ev.y - t.top;

      let name = dfop.nodeRemarks[type!];
      if (type == 'startround') {
        name = '开始';
        if (hasStartround) {
          console.log('只能有一个开始节点');
          return false;
        }
      }
      if (type == 'endround') {
        name = '结束';
        if (hasEndround) {
          console.log('只能有一个结束节点');
          return false;
        }
      }

      addNode(
        { id: newGuid(), name: name, left: X, top: Y, type: type },
        false,
      );
    }
    setNodes([...nodes]);
  };

  //划线时用的绑定
  const workAreaMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    let dfop = props;
    if (dfop.isPreview) {
      return;
    }
    if (dfop.currentBtn != 'direct') return;
    if (!lineStart) return;
    let ev = mousePosition(e),
      t = getElCoordinate(e.currentTarget);
    let X, Y;
    X = ev.x - t.left;
    Y = ev.y - t.top;

    let line: any = null;
    lines.forEach(function (o) {
      //
      if (o.id == 'lr_workflow_tmp_line') {
        line = o.$line;
      }
    });
    if (!line) return;
    line.hi!.d = 'M ' + lineStart.x + ' ' + lineStart.y + ' L ' + X + ' ' + Y;
    line.path!.d = 'M ' + lineStart.x + ' ' + lineStart.y + ' L ' + X + ' ' + Y;
    if (line.path!.markerEnd == 'url(#arrow2)') {
      line.path!.markerEnd = 'url(#arrow3)';
    } else {
      line.path!.markerEnd = 'url(#arrow3)';
    }
    setLines([...lines]);
    console.log('workAreaMouseMove');
  };

  const workAreaMouseup = () => {
    let dfop = props;
    if (dfop.isPreview) {
      return;
    }
    if (dfop.currentBtn != 'direct') return;
    setLineStart(null);
    if (lines.length > 0) {
      let line;
      let num = 0;
      lines.forEach(function (o, i) {
        //
        if (o.id == 'lr_workflow_tmp_line') {
          line = o;
          num = i;
        }
      });
      if (line) {
        lines.splice(num, 1);
      }
    }
    setLines([...lines]);
    console.log('workAreaMouseup', lines);
  };

  const gClick = (id: string) => {
    focusItem(id, 'line');
  };

  const linemoverMousedown = (e: any) => {
    if (e.button == 2) return false;
    let lm = $linemover.current;
    // lm.css({ "background-color": "#333" });
    // var $workArea = e.data.$workArea;
    if (!lineMove.css) {
      lineMove.css = {};
    }
    let newCss = { backgroundColor: '#333' };
    Object.assign(newCss, lineMove.css);
    newCss.backgroundColor = '#333';
    lineMove.css = newCss;

    let ev = mousePosition(e),
      t = getElCoordinate($workArea.current);
    let X, Y;
    X = ev.x - t.left;
    Y = ev.y - t.top;
    let vX = X - lm!.offsetLeft,
      vY = Y - lm!.offsetTop;
    let isMove = false;
    document.onmousemove = function (e: any) {
      if (!e) e = window.event;
      let ev = mousePosition(e);
      X = ev.x - t.left;
      Y = ev.y - t.top;
      let type = lineMove.data ? lineMove.data.type : '';
      if (type == 'lr') {
        X = X - vX;
        if (X < 0) X = 0;
        else if (X > 5000) X = 5000;
        // lm.css({ left: X + "px" });
        let newCss = { left: X + 'px' };
        console.log(newCss);
        Object.assign(newCss, lineMove.css);
        newCss.left = X + 'px';
        lineMove.css = newCss;
      } else if (type == 'tb') {
        Y = Y - vY;
        if (Y < 0) Y = 0;
        else if (Y > 5000) Y = 5000;
        // lm.css({ top: Y + "px" });
        if (!lineMove.css) {
          lineMove.css = {};
        }
        let newCss2 = { top: Y + 'px' };
        Object.assign(newCss2, lineMove.css);
        newCss2.top = Y + 'px';
        lineMove.css = newCss2;
      }
      isMove = true;
      setLineMove({ ...lineMove });
      console.log('linemoverMousedown-onmousemove');
    };
    document.onmouseup = function () {
      let lineId = lineMove.data.tid;
      if (isMove) {
        let type = lineMove.data ? lineMove.data.type : '';
        if (type == 'lr') setLineM(lineId, lm!.offsetLeft + 3);
        else if (type == 'tb') setLineM(lineId, lm!.offsetTop + 3);
      }
      let newCss = { backgroundColor: 'transparent' };
      Object.assign(newCss, lineMove.css);
      newCss.backgroundColor = 'transparent';
      lineMove.css = newCss;
      let tid = lineMove.data.tid;
      if (focusId == tid) {
        focusItem(tid, 'line');
      }
      document.onmousemove = null;
      document.onmouseup = null;
      setLineMove({ ...lineMove });
      console.log(lineMove.css);
      console.log(lineOper.css);
      console.log('linemoverMousedown-onmouseup');
    };
    console.log('linemoverMousedown');
  };

  const lineoperClick = (e: any) => {
    if (!e) e = window.event;
    if (e.target.tagName != 'A' && e.target.tagName != 'B') return;

    let id = lineOper.tid;
    let type = e.target.className;
    if (type == 'x') {
      delLine(id);
      lineOper.css = { display: 'none' };
      setLineOper({ ...lineOper });
    } else {
      setLineType(id, type);
    }
  };

  //添加节点
  const addNode = (node: Node, isold: boolean) => {
    let auditor = '';
    let $node: Node = {
      isShowNodeico: true,
      css: {},
      isShowNodeclose: false,
      className: [], //node节点class
      bClassName: '', //node节点下b标签的class
    };
    Object.assign($node, node);

    if (!$node.width || $node.width < 150) $node.width = 150;
    if (!$node.height || $node.height < 65) $node.height = 65;
    if (!$node.top || $node.top < 0) $node.top = 0;
    if (!$node.left || node.left! < 0) $node.left = 0;
    if (!!$node.history && $node.history.length > 0) {
      //edit in 20230626 by lzs 此节点审批历史记录是按时间倒序，取最新的就好
      if (!!node.history![0].createUserName) {
        auditor = '(' + node.history![0].createUserName + ')';
      }
      if (!!node.history![0].namelist) {
        auditor = '(' + node.history![0].namelist + ')';
      }
    }
    if ($node.type == 'conditionnode') {
      $node.width = 160;
      $node.height = 90;
      $node.className!.push('lr-workflow-node');
      $node.className!.push('item-conditionnode');
      $node.bClassName = 'ico_' + node.type + 'div';
    } else if ($node.type != 'startround' && $node.type != 'endround') {
      $node.className!.push('lr-workflow-node');
      $node.name = node.name + auditor;
      $node.bClassName = 'ico_' + node.type;
    } else {
      $node.width = 52;
      $node.height = 52;
      if ($node.type == 'startround') {
        setHasStartround(true);
      } else if ($node.type == 'endround') {
        $node.name = '结束';
        setHasEndround(true);
      }
      $node.className!.push('lr-workflow-node');
      $node.className!.push('item-' + $node.type);
      $node.name = node.name + auditor;
      $node.bClassName = '';
    }
    $node.css!.top = $node.top;
    $node.css!.left = $node.left;
    $node.css!.width = $node.width;
    $node.css!.height = $node.height;

    if (
      node.state != undefined &&
      (node.type == 'startround' ||
        node.type == 'auditornode' ||
        node.type == 'stepnode' ||
        node.type == 'confluencenode' ||
        node.type == 'childwfnode' ||
        node.type == 'systemauditnode')
    ) {
      $node.css!.paddingLeft = 0;
      $node.css!.color = '#fff';
      $node.isShowNodeico = false;
      switch (
        node.state //0正在处理 1 已处理同意 2 已处理不同意 3 未处理 4 当前需要处理的节点
      ) {
        case '0':
          $node.css!.background = '#5bc0de';
          $node.css!.border = 0;
          break;
        case '1':
          $node.css!.background = '#5cb85c';
          $node.css!.border = 0;
          break;
        case '2':
          $node.css!.background = '#d9534f';
          $node.css!.border = 0;
          break;
        case '3':
          $node.css!.background = '#999';
          $node.css!.border = 0;
          break;
        case '4':
          $node.css!.background = '#f0ad4e';
          $node.css!.border = 0;
          break;
      }
    }

    // 初始化节点的配置信息
    if (!isold) {
      switch (node.type) {
        case 'startround':
          node.wfForms = [];
          break;
        case 'stepnode':
          node.auditors = [];
          node.wfForms = [];
          node.btnlist = [];
          break;
        case 'auditornode':
          node.auditors = [];
          node.wfForms = [];
          break;
        case 'confluencenode': // 会签
          break;
        case 'conditionnode': // 条件
          node.conditions = [];
          break;
        case 'childwfnode': // 条件
          node.auditors = [];
          break;
      }
    }
    nodes.push($node);
    setNodes([...nodes]);
  };

  //删除结点
  const delNode = (nodeData: any) => {
    if (props.isPreview) {
      return;
    }

    //删除关联线
    for (let i = lines.length - 1; i >= 0; i--) {
      let tmpLine = lines[i];
      if (tmpLine.from != nodeData.id && tmpLine.to != nodeData.id) {
      } else {
        lines.splice(i, 1);
      }
    }
    setLines([...lines]);

    //删除节点
    for (let j = nodes.length - 1; j >= 0; j--) {
      let tmpNode = nodes[j];
      if (tmpNode.id == nodeData.id) {
        nodes.splice(j, 1);
      }
    }
    setNodes([...nodes]);
    if (nodeData.type == 'startround') {
      setHasStartround(false);
    } else if (nodeData.type == 'endround') {
      setHasEndround(false);
    }

    setFocusId('');
    setFocusType('');
  };

  //移动结点到一个新的位置
  const moveNode = (nodeData: any, left: any, top: any) => {
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    nodeData.left = left;
    nodeData.top = top;
    //重画转换线
    resetLines(nodeData.id);
    setNodes([...nodes]);
  };

  // 取消所有结点/连线被选定的状态
  const blurItem = () => {
    if (focusId) {
      if (focusType == 'node') {
        //判断是否为点
        nodes.forEach(function (o) {
          //
          if (o.id == focusId) {
            o.isShowNodeclose = false;
            if (o.className!.indexOf('lr-workflow-nodefocus') > 0) {
              o.className!.splice(
                o.className!.indexOf('lr-workflow-nodefocus'),
                1,
              );
            }
            if (o.className!.indexOf('lr-workflow-nodemark') > 0) {
              o.className!.splice(
                o.className!.indexOf('lr-workflow-nodemark'),
                1,
              );
            }
          }
        });
        setNodes([...nodes]);
      } else if (focusType == 'line') {
        let lineData = getLine(focusId);
        if (!lineData?.marked) {
          lines.forEach(function (o) {
            //
            if (o.id == focusId) {
              let $line = o.$line;
              if (lineData?.color == '2') {
                $line.path!.stroke = '#ff3300';
                $line.path!.markerEnd = 'url(#arrow2)';
              } else {
                $line.path!.stroke = 'gray';
                $line.path!.markerEnd = 'url(#arrow1)';
              }
            }
          });
          setLines([...lines]);
        }
        lineMove.css = { display: 'none' };
        lineOper.css = { display: 'none' };
        setLineMove({ ...lineMove });
        setLineOper({ ...lineMove });
      }
    }
    setFocusId('');
    setFocusType('');
    return true;
  };

  // 选定某个结点/转换线
  const focusItem = (id: string, type: string) => {
    if (!blurItem()) {
      //先执行"取消选中",如果返回FLASE,则也会阻止选定事件继续进行.
      return;
    }

    //如果是节点
    if (type == 'node') {
      nodes.forEach(function (o) {
        //
        if (o.id == id) {
          o.isShowNodeclose = true;
          o.className!.push('lr-workflow-nodefocus');
        }
      });
      setNodes([...nodes]);
    } else if (type == 'line') {
      //如果是连接线
      lines.forEach(function (o) {
        //
        if (o.id == id && o.$line) {
          let $line = o.$line;
          $line.path!.stroke = '#225ee1';
          $line.path!.markerEnd = 'url(#arrow3)';

          let x,
            y,
            from: number[] = [],
            to: number[] = [];
          let tmpfrom = $line.from!.split(',');
          let tmpto = $line.to!.split(',');
          from[0] = parseInt(tmpfrom[0], 10);
          from[1] = parseInt(tmpfrom[1], 10);
          to[0] = parseInt(tmpto[0], 10);
          to[1] = parseInt(tmpto[1], 10);

          let lineData = getLine(id);

          if (lineData!.type == 'lr') {
            from[0] = lineData!.M!;
            to[0] = from[0];

            lineMove.css = {
              width: '5px',
              height: (to[1] - from[1]) * (to[1] > from[1] ? 1 : -1) + 'px',
              left: from[0] - 3 + 'px',
              top: (to[1] > from[1] ? from[1] : to[1]) + 1 + 'px',
              cursor: 'e-resize',
              display: 'block',
            };
            lineMove.data = { type: 'lr', tid: id };
          } else if (lineData!.type == 'tb') {
            from[1] = lineData!.M!;
            to[1] = from[1];

            lineMove.css = {
              width: (to[0] - from[0]) * (to[0] > from[0] ? 1 : -1) + 'px',
              height: '5px',
              left: (to[0] > from[0] ? from[0] : to[0]) + 1 + 'px',
              top: from[1] - 3 + 'px',
              cursor: 's-resize',
              display: 'block',
            };
            lineMove.data = { type: 'tb', tid: id };
          }
          x = (from[0] + to[0]) / 2 - 35;
          y = (from[1] + to[1]) / 2 + 6;

          lineOper.css = { display: 'block', left: x + 'px', top: y + 'px' };
          lineOper.tid = id;

          setLineMove({ ...lineMove });
          setLineOper({ ...lineOper });
        }
      });
      setLines([...lines]);
    }

    setFocusId(id);
    setFocusType(type);
    props.changeCurrentBtn!('cursor');
  };

  //获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
  const getElCoordinate = (dom: any) => {
    // var dom = e.currentTarget;
    let t = dom.offsetTop;
    let l = dom.offsetLeft;
    dom = dom.offsetParent;
    while (dom) {
      t += dom.offsetTop;
      l += dom.offsetLeft;
      dom = dom.offsetParent;
    }
    return {
      top: t,
      left: l,
    };
  };

  // 获取鼠标定位点坐标
  const mousePosition = (
    e:
      | Event
      | React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | undefined,
  ) => {
    if (!e) e = window.event;
    let ev = e as MouseEvent;
    if ((ev as MouseEvent).pageX || ev.pageY) {
      return { x: ev.pageX, y: ev.pageY };
    }
    return {
      x:
        ev.clientX +
        document.documentElement.scrollLeft -
        document.body.clientLeft,
      y:
        ev.clientY +
        document.documentElement.scrollTop -
        document.body.clientTop,
    };
  };

  //绑定用鼠标移动事件(节点拖动)
  const nodeIcoMousedown = (nodeData: any, e: any) => {
    if (props.isPreview) {
      return;
    }
    let dfop = props;

    e = e || window.event;
    if (dfop.$nowType == 'direct') {
      return;
    }
    let id = nodeData.id;
    let $workAreaCCC = $workArea.current;
    focusItem(id, 'node');
    let ev = mousePosition(e),
      t = getElCoordinate($workAreaCCC);
    ghost.isShow = true;
    ghost.name = nodeData.name;
    ghost.type = nodeData.type;
    ghost.bClassName = nodeData.bClassName;
    ghost.isShowNodeico = nodeData.isShowNodeico;
    if (
      nodeData.type == 'endround' ||
      nodeData.type == 'startround' ||
      nodeData.type == 'conditionnode'
    ) {
      ghost.css = { paddingLeft: 0 };
    } else {
      ghost.css = { paddingLeft: 48 };
    }

    if (nodeData.type == 'conditionnode') {
    }

    let X: any, Y: any;
    t.left = 0;
    X = ev.x - t.left;
    Y = ev.y - t.top;
    let vX = X - nodeData.left,
      vY = Y - nodeData.top;
    let isMove = false;
    // var hack = 1;
    // if (navigator.userAgent.indexOf("8.0") != -1) hack = 0;
    document.onmousemove = function (e: any) {
      if (!e) e = window.event;
      let ev = mousePosition(e);
      if (X == ev.x - vX && Y == ev.y - vY) return false;
      X = ev.x - vX;
      Y = ev.y - vY - 47;
      if (isMove && !ghost.css.display && ghost.css.display != 'table') {
        ghost.css = {
          display: 'table',
          width: nodeData.css.width,
          height: nodeData.css.height,
          top: nodeData.top,
          left: nodeData.left + t.left,
          cursor: 'move',
        };
      }
      if (X < 60) {
        X = 60;
      } else if (X + nodeData.width > t.left + $workAreaCCC!.clientWidth) {
        X = t.left + $workAreaCCC!.clientWidth - nodeData.width;
      }

      if (Y < 0) {
        Y = 0;
      } else if (
        Y + nodeData.height >
        t.top + $workAreaCCC!.clientHeight - 47
      ) {
        Y = $workAreaCCC!.clientHeight - nodeData.height + t.top - 47;
      }
      isMove = true;
      let newcss: any = {};
      Object.assign(newcss, ghost.css);
      newcss.left = X;
      newcss.top = Y;
      ghost.css = newcss;
      setGhost({ ...ghost });
    };
    document.onmouseup = function () {
      ghost = { isShow: false };
      if (isMove) moveNode(nodeData, X - t.left, Y + 47 - t.top);
      document.onmousemove = null;
      document.onmouseup = null;
      setGhost({ ...ghost });
    };
    return false;
  };

  //绑定鼠标覆盖事件
  const nodeMouseEnter = (nodeData: any) => {
    if (props.isPreview) {
      return;
    }
    let dfop = props;
    if (dfop.currentBtn != 'direct') return;
    if (nodeData.className.indexOf('r-workflow-nodemark') == -1) {
      nodeData.className.push('lr-workflow-nodemark');
    }
    setNodes([...nodes]);
  };

  //绑定鼠标移出事件
  const nodeMouseLeave = (nodeData: any) => {
    if (props.isPreview) {
      return;
    }
    let dfop = props;
    if (dfop.currentBtn != 'direct') return;
    if (nodeData.className.indexOf('lr-workflow-nodemark') > 0) {
      nodeData.className.splice(
        nodeData.className.indexOf('lr-workflow-nodemark'),
        1,
      );
    }
    setNodes([...nodes]);
  };

  //绑定连线时确定初始点
  const nodespotMousedown = (nodeData: any, kind: any) => {
    if (props.isPreview) {
      return;
    }
    let dfop = props;
    if (dfop.currentBtn != 'direct') return;
    let X, Y;
    X = nodeData.left;
    Y = nodeData.top;
    let position = 'left';
    if (kind == 'left') {
      position = 'left';
      Y += nodeData.height / 2;
    } else if (kind == 'top') {
      position = 'top';
      X += nodeData.width / 2;
    } else if (kind == 'right') {
      position = 'right';
      X += nodeData.width;
      Y += nodeData.height / 2;
    } else if (kind == 'bottom') {
      position = 'bottom';
      X += nodeData.width / 2;
      Y += nodeData.height;
    }
    setLineStart({ x: X, y: Y, id: nodeData.id, position: position });
    let line: any = {};
    //判断有无临时line
    let hasTmp = false;
    lines.forEach(function (o) {
      //
      if (o.id == 'lr_workflow_tmp_line') {
        hasTmp = true;
        return false;
      }
    });
    if (!hasTmp) {
      line.id = 'lr_workflow_tmp_line';
      let $line = drawLine(
        '1',
        'lr_workflow_tmp_line',
        [X, Y],
        [X, Y],
        true,
        true,
      );
      line.$line = $line;
      lines.push(line);
    }
    console.log('nodespotMousedown');
  };

  //绑定连线时确定结束点
  const nodespotMouseup = (nodeData: any, kind: any) => {
    if (props.isPreview) {
      return;
    }
    let dfop = props;
    if (dfop.currentBtn != 'direct') return;

    let position = 'left';
    if (kind == 'left') {
      position = 'left';
    } else if (kind == 'top') {
      position = 'top';
    } else if (kind == 'right') {
      position = 'right';
    } else if (kind == 'bottom') {
      position = 'bottom';
    }
    console.log('lineStart', lineStart);
    if (lineStart)
      addLine({
        id: newGuid(),
        from: lineStart.id,
        to: nodeData.id,
        sp: lineStart.position,
        ep: position,
        name: '',
      });
    console.log(lines);
    setLines([...lines]);
    console.log('nodespotMouseup');
  };

  const nodespotMouseenter = () => {
    // var dfop = e.data.$workArea[0].dfop;
    // if (dfop.currentBtn != "direct") return;
    // $(this).addClass("lr-workflow-nodespotmark");
  };

  // 获取线条数据
  const getLine = (lineId: string) => {
    for (let i = 0, l = lines.length; i < l; i++) {
      if (lineId == lines[i].id) {
        return lines[i];
      }
    }
  };

  // 获取线条端点坐标
  const getLineSpotXY = (nodeId: any, type: any) => {
    let nodeData;
    for (let i = 0, l = nodes.length; i < l; i++) {
      if (nodeId == nodes[i].id) {
        nodeData = nodes[i];
        break;
      }
    }
    if (!nodeData) {
      return [0, 0];
    }
    let X: any, Y: any;
    X = nodeData.left;
    Y = nodeData.top;
    switch (type) {
      case 'left':
        Y += nodeData.height! / 2;
        break;
      case 'top':
        X += nodeData.width! / 2;
        break;
      case 'right':
        X += nodeData.width;
        Y += nodeData.height! / 2;
        break;
      case 'bottom':
        X += nodeData.width! / 2;
        Y += nodeData.height;
        break;
    }
    return [X, Y];
  };

  // 计算两个结点间要连折线的话，连线的所有坐标
  const calcPolyPoints = (SP: any, EP: any, type: any, M: any) => {
    let m1: any = [],
      m2: any = [];
    if (type == 'lr') {
      let m = M || (SP[0] + EP[0]) / 2;
      //粗略计算2个中点
      m1 = [m, SP[1]];
      m2 = [m, EP[1]];
    }
    //如果是允许中段可上下移动的折线,则参数M为可移动中段线的Y坐标
    else if (type == 'tb') {
      let m = M || (SP[1] + EP[1]) / 2;
      //粗略计算2个中点
      m1 = [SP[0], m];
      m2 = [EP[0], m];
    }
    return { start: SP, m1: m1, m2: m2, end: EP };
  };

  //画一条只有两个中点的折线
  const drawPoly = (
    color: any,
    id: any,
    sp: any,
    m1: any,
    m2: any,
    ep: any,
    mark: any,
  ) => {
    let poly: any = {},
      strPath = '',
      hi: any = {},
      path: any = {};
    if (id != '') poly.id = id;
    poly.from = sp[0] + ',' + sp[1];
    poly.to = ep[0] + ',' + ep[1];
    hi.visibility = 'hidden';
    hi.strokeWidth = 9;
    hi.fill = 'none';
    hi.stroke = 'white';
    strPath = 'M ' + sp[0] + ' ' + sp[1];
    if (m1[0] != sp[0] || m1[1] != sp[1])
      strPath += ' L ' + m1[0] + ' ' + m1[1];
    if (m2[0] != ep[0] || m2[1] != ep[1])
      strPath += ' L ' + m2[0] + ' ' + m2[1];
    strPath += ' L ' + ep[0] + ' ' + ep[1];
    hi.d = strPath;
    hi.pointerEvents = 'stroke';
    path.d = strPath;
    path.strokeWidth = 2.0;
    path.strokeLinecap = 'round';
    path.fill = 'none';

    if (mark) {
      path.stroke = '#3498DB';
      path.markerEnd = 'url(#arrow3)';
    } else if (color == '2') {
      path.stroke = '#ff3300';
      path.markerEnd = 'url(#arrow2)';
    } else {
      path.stroke = 'gray';
      path.markerEnd = 'url(#arrow1)';
    }
    poly.hi = hi;
    poly.path = path;

    let text: any = {};
    let x = (m2[0] + m1[0]) / 2;
    let y = (m2[1] + m1[1]) / 2;
    text.textAnchor = 'middle';
    text.x = x;
    text.y = y - 5;
    text.style = {
      cursor: 'text',
    };
    poly.style = {
      cursor: 'pointer',
    };
    poly.text = text;
    return poly;
  };

  // 绘制一条箭头线，并返回线的DOM
  const drawLine = (
    color: any,
    id: any,
    sp: any,
    ep: any,
    mark: any,
    dash: any,
  ) => {
    let line = {
      id: id,
      from: sp[0] + ',' + sp[1],
      to: ep[0] + ',' + ep[1],
      style: { cursor: 'crosshair' },
      hi: {},
      path: { style: {} },
      text: { isShow: false },
    };

    let hi: any = {};
    hi.visibility = 'hidden';
    hi.strokeWidth = 9;
    hi.fill = 'none';
    hi.stroke = 'white';
    hi.d = 'M ' + sp[0] + ' ' + sp[1] + ' L ' + ep[0] + ' ' + ep[1];
    hi.pointerEvents = 'stroke';

    let path: any = {};
    path.d = 'M ' + sp[0] + ' ' + sp[1] + ' L ' + ep[0] + ' ' + ep[1];
    path.strokeWidth = 2;
    path.strokeLinecap = 'round';
    path.fill = 'none';

    if (dash) path.style = { strokeDasharray: '6,5' };

    if (mark) {
      path.stroke = '#3498DB';
      path.markerEnd = 'url(#arrow3)';
    } else if (color == '2') {
      path.stroke = '#ff3300';
      path.markerEnd = 'url(#arrow2)';
    } else {
      path.stroke = 'gray';
      path.markerEnd = 'url(#arrow1)';
    }

    line.style.cursor = 'crosshair';
    if (id != '' && id != 'lr_workflow_tmp_line') {
      let text: any = {};
      let x = (ep[0] + sp[0]) / 2;
      let y = (ep[1] + sp[1]) / 2;

      text.isShow = true;
      text.textAnchor = 'middle';
      text.x = x;
      text.y = y - 5;
      text.style = { cursor: 'text' };
      line.text = text;
      line.style.cursor = 'pointer';
    }
    line.hi = hi;
    line.path = path;
    return line;
  };

  //节点点击事件
  const nodeClick = (node: any, e: any) => {
    e.stopPropagation();
    if (e.detail > 1) {
      //点击次数大于1，当作双击
      // var nodeData = {
      //     id: node.id
      // };
      // props.openNode && _this.props.openNode(nodeData, _this.state.nodes);
    } else {
      //单击
      if (props.isPreview) {
        return;
      }
      focusItem(node.id, 'node');
    }
  };

  // 增加一条线
  const addLine = (line: any) => {
    // 传阅节点和结束节点不允许做为开始节点
    let _isReturn = false;
    nodes.forEach(function (o) {
      //
      if (o.id == line.from) {
        if (o.type == 'endround' || o.type == 'auditornode') {
          _isReturn = true;
        }
        return false;
      }
    });
    if (_isReturn) return;

    let $line;
    if (line.from == line.to) return;
    // 避免两个节点间不能有一条以上同向接连线
    for (let i = 0, l = lines.length; i < l; i++) {
      if (line.from == lines[i].from && line.to == lines[i].to) {
        return;
      }
    }
    // 获取开始和结束节点的坐标
    let sxy = getLineSpotXY(line.from, line.sp);
    let exy = getLineSpotXY(line.to, line.ep);
    line.name = line.name || '';
    line.color = line.color || '1';
    if (line.type && line.type != 'sl') {
      let res = calcPolyPoints(sxy, exy, line.type, line.M);
      $line = drawPoly(
        line.color,
        line.id,
        res.start,
        res.m1,
        res.m2,
        res.end,
        line.mark,
      );
    } else {
      line.type = 'sl'; //默认为直线
      $line = drawLine(line.color, line.id, sxy, exy, line.mark, null);
    }
    if (line.name != '') {
      // $($line).find('text').html(line.name);
    }
    line.$line = $line;
    lines.push(line);
    setLines([...lines]);
  };

  // 重构所有连向某个结点的线的显示，传参结构为$nodeData数组的一个单元结构
  const resetLines = (nodeId: string) => {
    let $line;
    for (let i = 0, l = lines.length; i < l; i++) {
      let sxy = [];
      let exy = [];
      let line = lines[i];
      if (line.from == nodeId || line.to == nodeId) {
        sxy = getLineSpotXY(line.from!, line.sp!);
        exy = getLineSpotXY(line.to!, line.ep!);

        let tmpline;
        lines.forEach(function (o) {
          //
          if (o.id == line.id) {
            tmpline = o;
          }
        });
        if (tmpline) {
          if (lines.indexOf(tmpline) > 0) {
            lines.splice(lines.indexOf(tmpline), 1);
          }
        }

        if (line.type == 'sl') {
          $line = drawLine(line.color, line.id, sxy, exy, line.mark, '');
        } else {
          let res = calcPolyPoints(sxy, exy, line.type, line.M);
          $line = drawPoly(
            line.color,
            line.id,
            res.start,
            res.m1,
            res.m2,
            res.end,
            line.mark,
          );
        }

        line.$line = $line;
        lines.push(line);
        setLines([...lines]);
      }
    }
  };

  //重新设置连线的样式 newType= "sl":直线, "lr":中段可左右移动型折线, "tb":中段可上下移动型折线
  const setLineType = (id: any, newType: any) => {
    let lineData = getLine(id);

    if (
      !newType ||
      newType == null ||
      newType == '' ||
      newType == lineData!.type
    )
      return false;
    let from = lineData!.from;
    let to = lineData!.to;
    lineData!.type = newType;

    let sxy = getLineSpotXY(from, lineData!.sp);
    let exy = getLineSpotXY(to, lineData!.ep);

    // 如果是变成折线
    if (newType != 'sl') {
      calcPolyPoints(sxy, exy, lineData!.type, lineData!.M);
      setLineM(id, getMValue(sxy, exy, newType));
    }
    // 如果是变回直线
    else {
      delete lineData!.M;
      lineMove.css = { display: 'none' };
      lineMove.data = {};
      setLineMove({ ...lineMove });

      //移除线
      for (let i = lines.length - 1; i >= 0; i--) {
        let tmpLine = lines[i];
        if (tmpLine.id == id) {
          lines.splice(i, 1);
        }
      }

      let $line = drawLine(
        lineData!.color,
        lineData!.id,
        sxy,
        exy,
        lineData!.mark,
        null,
      );

      lineData!.$line = $line;
      lines.push(lineData!);
    }
    setLines([...lines]);

    if (focusId == id) {
      focusItem(id, 'line');
    }
  };

  //设置折线中段的X坐标值（可左右移动时）或Y坐标值（可上下移动时）
  const setLineM = (id: any, M: any) => {
    let lineData = getLine(id);

    if (!lineData || M < 0 || !lineData.type || lineData.type == 'sl')
      return false;
    let from = lineData.from;
    let to = lineData.to;
    lineData.M = M;
    let sxy = getLineSpotXY(from, lineData.sp);
    let exy = getLineSpotXY(to, lineData.ep);
    let ps = calcPolyPoints(sxy, exy, lineData.type, lineData.M);

    //移除线
    for (let i = lines.length - 1; i >= 0; i--) {
      let tmpLine = lines[i];
      if (tmpLine.id == id) {
        lines.splice(i, 1);
      }
    }
    let $line = drawPoly(
      lineData.color,
      id,
      ps.start,
      ps.m1,
      ps.m2,
      ps.end,
      lineData.marked || focusId == id,
    );
    lineData.$line = $line;
    lines.push(lineData);
    setLines([...lines]);
  };

  //初始化折线中段的X/Y坐标,mType='rb'时为X坐标,mType='tb'时为Y坐标
  const getMValue = (sxy: any, exy: any, mType: any) => {
    if (mType == 'lr') {
      return (sxy[0] + exy[0]) / 2;
    } else if (mType == 'tb') {
      return (sxy[1] + exy[1]) / 2;
    }
  };

  // 删除线条
  const delLine = (lineId: any) => {
    for (let i = lines.length - 1; i >= 0; i--) {
      let tmpLine = lines[i];
      if (tmpLine.id == lineId) {
        lines.splice(i, 1);
      }
    }
    setFocusId('');
    setLines([...lines]);
  };

  return (
    <div className="lr-workflow-work" style={{ width: 5000, height: 5000 }}>
      <div
        className="lr-workflow-workinner"
        ref={$workArea}
        // unselectable='on'
        onClick={(e) => {
          clickWorkArea(e);
        }}
        onMouseMove={(e) => {
          workAreaMouseMove(e);
        }}
        onMouseUp={() => {
          workAreaMouseup();
        }}
      >
        <svg id={'draw_' + props.id} style={{ width: 5000, height: 5000 }}>
          <defs>
            <marker
              id="arrow1"
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerUnits="strokeWidth"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="gray" strokeWidth="0"></path>
            </marker>
            <marker
              id="arrow2"
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerUnits="strokeWidth"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M 0 0 L 6 3 L 0 6 z"
                fill="#ff3300"
                strokeWidth="0"
              ></path>
            </marker>
            <marker
              id="arrow3"
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerUnits="strokeWidth"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M 0 0 L 6 3 L 0 6 z"
                fill="#225ee1"
                strokeWidth="0"
              ></path>
            </marker>
          </defs>
          {lines.map(function (o, i) {
            let $line = o.$line;
            if (!$line) {
              return null;
            }
            let hi = $line.hi;
            let path = $line.path;
            let text = $line.text;
            return (
              <g
                key={i}
                id={o.id}
                from={o.from}
                to={o.to}
                onClick={() => {
                  gClick(o.id!);
                }}
              >
                <path
                  visibility={hi.visibility}
                  strokeWidth={hi.strokeWidth}
                  fill={hi.fill}
                  stroke={hi.stroke}
                  d={hi.d}
                  pointerEvents={hi.pointerEvents}
                ></path>
                <path
                  d={path.d}
                  strokeWidth={path.strokeWidth}
                  strokeLinecap={path.strokeLinecap}
                  fill={path.fill}
                  style={path.style}
                  stroke={path.stroke}
                  markerEnd={path.markerEnd}
                ></path>
                {text.isShow ? (
                  <text
                    textAnchor={text.textAnchor}
                    x={text.x}
                    y={text.y}
                    style={text.style}
                  ></text>
                ) : null}
              </g>
            );
          })}

          <g>
            <path></path>
            <path></path>
            <text></text>
          </g>
        </svg>
        {nodes.map(function (o, i) {
          //
          let nodeCss = o.css;
          let newNodeCss: any = {};
          Object.assign(newNodeCss, nodeCss);
          newNodeCss.left = o.left;
          newNodeCss.top = o.top;
          //节点
          return (
            <div
              className={o.className!.join(' ')}
              id={o.id}
              key={i}
              style={newNodeCss}
              onClick={(e) => {
                nodeClick(o, e);
              }}
              onMouseEnter={() => {
                nodeMouseEnter(o);
              }}
              onMouseLeave={() => {
                nodeMouseLeave(o);
              }}
            >
              {
                //节点图标
                o.isShowNodeico ? (
                  <div
                    className="lr-workflow-nodeico"
                    onMouseDown={(e) => {
                      nodeIcoMousedown(o, e);
                    }}
                  >
                    {o.type != 'startround' && o.type != 'endround' ? (
                      <b className={o.bClassName}></b>
                    ) : null}
                  </div>
                ) : null
              }
              <div className="lr-workflow-nodetext">{o.name}</div>
              <div className="lr-workflow-nodeassemble">
                {/* 删除节点按钮 */}
                {o.isShowNodeclose ? (
                  <div
                    className="lr-workflow-nodeclose"
                    style={{ display: 'block' }}
                    onClick={() => {
                      delNode(o);
                    }}
                  ></div>
                ) : null}
                <div
                  className="lr-workflow-nodespot left"
                  onMouseDown={() => {
                    nodespotMousedown(o, 'left');
                  }}
                  onMouseUp={() => {
                    nodespotMouseup(o, 'left');
                  }}
                  onMouseEnter={() => {
                    nodespotMouseenter();
                  }}
                >
                  <div className="lr-workflow-nodespotc"></div>
                </div>
                <div
                  className="lr-workflow-nodespot top"
                  onMouseDown={() => {
                    nodespotMousedown(o, 'top');
                  }}
                  onMouseUp={() => {
                    nodespotMouseup(o, 'top');
                  }}
                  onMouseEnter={() => {
                    nodespotMouseenter();
                  }}
                >
                  <div className="lr-workflow-nodespotc"></div>
                </div>
                <div
                  className="lr-workflow-nodespot right"
                  onMouseDown={() => {
                    nodespotMousedown(o, 'right');
                  }}
                  onMouseUp={() => {
                    nodespotMouseup(o, 'right');
                  }}
                  onMouseEnter={() => {
                    nodespotMouseenter();
                  }}
                >
                  <div className="lr-workflow-nodespotc"></div>
                </div>
                <div
                  className="lr-workflow-nodespot bottom"
                  onMouseDown={() => {
                    nodespotMousedown(o, 'bottom');
                  }}
                  onMouseUp={() => {
                    nodespotMouseup(o, 'bottom');
                  }}
                  onMouseEnter={() => {
                    nodespotMouseenter();
                  }}
                >
                  <div className="lr-workflow-nodespotc"></div>
                </div>
              </div>
            </div>
          );
        })}
        {/* 操作折线时的移动框 */}
        <div
          className="lr-workflow-linemover"
          style={lineMove.css}
          ref={$linemover}
          onMouseDown={(e) => {
            linemoverMousedown(e);
          }}
        ></div>
        <div
          className="lr-workflow-lineoper"
          style={lineOper.css}
          onClick={(e) => {
            lineoperClick(e);
          }}
        >
          <b className="lr"></b>
          <b className="tb"></b>
          <b className="sl"></b>
          <b className="x"></b>
        </div>
      </div>
      {
        //拖动节点的虚影
        ghost.isShow ? (
          <div
            className="lr-workflow-rsghost"
            // unselectable='on'
            style={ghost.css}
          >
            {
              //节点图标
              ghost.isShowNodeico ? (
                <div className="lr-workflow-nodeico">
                  {ghost.type != 'startround' && ghost.type != 'endround' ? (
                    <b className={ghost.bClassName}></b>
                  ) : null}
                </div>
              ) : null
            }
            <div className="lr-workflow-nodetext">{ghost.name}</div>
            <div className="lr-workflow-nodeassemble">
              <div className="lr-workflow-nodespot left">
                <div className="lr-workflow-nodespotc"></div>
              </div>
              <div className="lr-workflow-nodespot top">
                <div className="lr-workflow-nodespotc"></div>
              </div>
              <div className="lr-workflow-nodespot right">
                <div className="lr-workflow-nodespotc"></div>
              </div>
              <div className="lr-workflow-nodespot bottom">
                <div className="lr-workflow-nodespotc"></div>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
});

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  ...action,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Temp);
