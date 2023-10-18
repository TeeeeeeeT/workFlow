/*
 @description 全局方法
 */

// @/global.ts
import { message } from 'antd';

try {
  const { data: routesData } = await fetch('/api/system/routes', {
    method: 'POST',
  }).then((res) => res.json());
  if (routesData) {
    window.dynamicRoutes = routesData;
  }
} catch {
  message.error('路由加载失败');
}

export {};
