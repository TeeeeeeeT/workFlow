// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

import { parseRoutes } from '@/utils/dynamicRoutes';

// @ts-ignore
export function patchRoutes({ routes, routeComponents }) {
  if (window.dynamicRoutes) {
    const currentRouteIndex = Object.keys(routes).length;
    const parsedRoutes = parseRoutes(window.dynamicRoutes, currentRouteIndex);
    Object.assign(routes, parsedRoutes.routes); // 参数传递的为引用类型，直接操作原对象，合并路由数据
    Object.assign(routeComponents, parsedRoutes.routeComponents); // 合并组件
  }
}
