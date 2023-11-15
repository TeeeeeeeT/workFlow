import React, { useState, useEffect } from 'react';
import component from '@/component/index';
const Frame = component.frame.Frame;

import request from "umi-request";


const Temp = (props: any) => {
  let [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    getMenuTree();


    return () => { };
  }, []);

  const getMenuTree = () => {
    request
      .get("/api/v1/getMenuList")
      .then(function (response) {
        console.log(response);
        if (response.data) {
          menu = response.data;
          setMenu(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    // <div>{props.children}</div>
    <Frame
      menu={{
        items: menu,
        // activeId: activeId
      }}
      headMenu={{
        // items: this.state.headMenus,
        // activeId: this.state.activeId
      }}
      view={props.children}
    >
      {/* {this.state.view} */}
    </Frame>
  );
};

export default Temp;
