import React, { useEffect } from "react";
// @ts-ignore
import $ from "jquery";
import FlowChart from "@/components/FlowChart/FlowChart";

/*
  * @description: 首页组件
 */
const HomePage: React.FC = () => {
  useEffect(() => {
    console.log("$", $.lrworkflow);
  }, []);

  return (
    <div>
      <FlowChart />
    </div>
  );
};

export default HomePage;
