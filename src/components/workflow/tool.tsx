import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import action from './store/action';

interface ToolBtn {
  id: string;
  type: string;
  className: string;
}
interface Props {
  id: string;
  isPreview?: boolean;
  toolBtns: Array<string>;
  nodeRemarks: Record<string, any>;
  currentBtn?: string;
  changeCurrentBtn?: (arg0: string) => void;
}
const Temp: React.FC<Props> = (props) => {
  let [toolBtns, setToolBtns] = useState<Array<ToolBtn>>([]);

  useEffect(() => {
    let tempToolBtns = [
      {
        id: props.id + '_btn_cursor',
        type: 'cursor',
        className: 'lr-workflow-btndown',
      },
      {
        id: props.id + '_btn_direct',
        type: 'direct',
        className: 'lr-workflow-btn',
      },
    ];
    props.toolBtns.forEach(function (o) {
      //自定义按钮
      tempToolBtns.push({
        id: props.id + '_btn_' + o,
        type: o,
        className: 'lr-workflow-btn',
      });
    });
    props.changeCurrentBtn!('cursor');
    setToolBtns(tempToolBtns);

    return () => {
      props.changeCurrentBtn!('');
    };
  }, []);

  const switchToolBtn = (type: string) => {
    props.changeCurrentBtn!(type);
  };

  return (
    <div className="lr-workflow-tool">
      {toolBtns.map(function (o, i) {
        let _html: ReactElement | null = null;
        if (o.type == 'direct') {
          _html = <span></span>;
        }
        return (
          <a
            key={i}
            type={o.type}
            id={o.id}
            title={props.nodeRemarks[o.type]}
            className={
              props.currentBtn == o.type
                ? 'lr-workflow-btndown'
                : 'lr-workflow-btn'
            }
          >
            <b
              className={'ico_' + o.type}
              onClick={() => {
                switchToolBtn(o.type);
              }}
            />
            {_html}
          </a>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  ...action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Temp);
