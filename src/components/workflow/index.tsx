import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Provider } from 'react-redux';
import Area from './area';
import './module.scss';
import store from './store/store';
import Tool from './tool';

interface Props {
  id: string;
  isPreview: boolean;
  ref?: any;
}

const Temp: React.FC<Props> = forwardRef((props, ref) => {
  let [id] = useState(props.id);
  let [isPreview] = useState(props.isPreview);
  let [toolBtns] = useState([
    'startround',
    'endround',
    'stepnode',
    'confluencenode',
    'conditionnode',
    'auditornode',
    'childwfnode',
  ]);
  let [nodeRemarks] = useState({
    cursor: '选择指针',
    direct: '步骤连线',
    startround: '开始节点',
    endround: '结束节点',
    stepnode: '普通节点',
    confluencenode: '会签节点',
    conditionnode: '条件判断节点',
    auditornode: '传阅节点',
    childwfnode: '子流程节点',
  });
  const areaRef = useRef<any>(null);

  // 将外部需要访问的属性和方法暴露出去
  useImperativeHandle(ref, () => ({
    workflowGet,
    workflowSet,
  }));

  //获取节点、线集合
  const workflowGet = () => {
    let data = {
      nodes: areaRef.current.nodes,
      lines: areaRef.current.lines,
    };
    return data;
  };

  //设置流程图
  const workflowSet = (name: any, op: any) => {
    switch (name) {
      case 'updateNodeName':
        // $.lrworkflow.updateNodeName($workArea, op.nodeId);
        break;
      case 'updateLineName':
        // $.lrworkflow.updateLineName($workArea, op.lineId);
        break;
      case 'set':
        areaRef.current.setNodes([]);
        for (let i = 0, l = op.data.nodes.length; i < l; i++) {
          let node = op.data.nodes[i];
          areaRef.current.addNode(node, true);
        }

        areaRef.current.setLines([]);
        for (let j = 0, l = op.data.lines.length; j < l; j++) {
          let line = op.data.lines[j];
          areaRef.current.addLine(line);
        }
        break;
    }
  };

  return (
    <div className="lr-workflow" id={id}>
      <Provider store={store}>
        {!isPreview ? (
          <Tool id={id} nodeRemarks={nodeRemarks} toolBtns={toolBtns} />
        ) : null}
        <Area id={id} nodeRemarks={nodeRemarks} ref={areaRef} />
      </Provider>
    </div>
  );
});

export default Temp;
