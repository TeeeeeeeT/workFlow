import React, { useEffect } from 'react';
// @ts-ignore
import $ from 'jquery';
// import FlowChart from "@/components/FlowChart/FlowChart";
import Workflow from '@/components/workflow/index';

/*
 * @description: 首页组件
 */
const HomePage: React.FC = () => {
  useEffect(() => {
    console.log('$', $.lrworkflow);
  }, []);

  return (
    <div>
      {/* <FlowChart /> */}
      <Workflow id="workflow" isPreview={true} />
    </div>
  );
};

export default HomePage;
