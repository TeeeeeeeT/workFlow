// import yayJpg from '../assets/yay.jpg';
import React, { useEffect, useRef } from 'react';
import { Workflow } from 'cmao-ui';

const HomePage = () => {
  useEffect(() => {
    // console.log('$', $.lrworkflow);
    // var op = {
    //   data: {"nodes":[{"isShowNodeico":true,"css":{"top":224,"left":181,"width":150,"height":65},"isShowNodeclose":false,"className":["lr-workflow-node"],"bClassName":"ico_stepnode","id":"d49fc96a-26a3-3bde-c016-9846121da25d","name":"普通节点","left":181,"top":224,"type":"stepnode","width":150,"height":65},{"isShowNodeico":true,"css":{"top":254,"left":692,"width":150,"height":65},"isShowNodeclose":false,"className":["lr-workflow-node"],"bClassName":"ico_stepnode","id":"73c796c9-922d-8644-25fb-df1ff9f1ff2b","name":"普通节点","left":692,"top":254,"type":"stepnode","width":150,"height":65}],"lines":[{"id":"f87b0267-d4aa-1051-e514-6b2856616cf8","from":"d49fc96a-26a3-3bde-c016-9846121da25d","to":"73c796c9-922d-8644-25fb-df1ff9f1ff2b","sp":"right","ep":"left","name":"","color":"1","type":"sl","$line":{"id":"f87b0267-d4aa-1051-e514-6b2856616cf8","from":"331,256.5","to":"692,286.5","style":{"cursor":"pointer"},"hi":{"visibility":"hidden","strokeWidth":9,"fill":"none","stroke":"white","d":"M 331 256.5 L 692 286.5","pointerEvents":"stroke"},"path":{"d":"M 331 256.5 L 692 286.5","strokeWidth":2,"strokeLinecap":"round","fill":"none","stroke":"gray","markerEnd":"url(#arrow1)"},"text":{"isShow":true,"textAnchor":"middle","x":511.5,"y":266.5,"style":{"cursor":"text"}}}}]}
    // }
    // workflowRef.current.workflowSet('set', op);
  }, []);

  const c = (d: any) => {
    console.log(d);
  }
  const b = (d: any) => {
    console.log(d);
  }

  const workflowRef = useRef<any>(null);
  return (
    // <div>
    //   <h2>Yay! Welcome to umi!</h2>
    //   <p>
    //     <img src={yayJpg} width="388" />
    //   </p>
    //   <p>
    //     To get started, edit <code>pages/index.tsx</code> and save to reload.
    //   </p>
    // </div>
    <Workflow id="workflow" isPreview={false} ref={workflowRef} openNode={c} openLine={b} />
  );
}

export default HomePage;
