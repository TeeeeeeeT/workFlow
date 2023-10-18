import type { DynamicRoutes } from '@/utils/dynamicRoutes/typing';
import '@umijs/max/typings';

declare global {
  interface Window {
    dynamicRoutes: DynamicRoutes.RouteRaw[];
  }
}
