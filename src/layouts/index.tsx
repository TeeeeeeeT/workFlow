import React from 'react';
import { Outlet } from 'umi';

const HomePage: React.FC = (props) => {
  // //使用 `useAppData` / `useSelectedRoutes` 可以获得更多路由信息
  // const clientRoutes = useAppData()
  // const routes = useSelectedRoutes();
  console.log(props);

  return <Outlet />;
};

export default HomePage;
