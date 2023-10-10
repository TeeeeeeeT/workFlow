import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Area from './area';
import './module.scss';
import store from './store/store';
import Tool from './tool';

interface Props {
  id: string;
  isPreview: boolean;
}

const Temp: React.FC<Props> = (props) => {
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

  return (
    <div className="lr-workflow" id={id}>
      <Provider store={store}>
        {isPreview ? (
          <Tool id={id} nodeRemarks={nodeRemarks} toolBtns={toolBtns} />
        ) : null}
        <Area id={id} nodeRemarks={nodeRemarks} />
      </Provider>
    </div>
  );
};

export default Temp;
