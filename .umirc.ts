import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  // routes: [
  //   {
  //     path: "/",
  //     redirect: "/home"
  //   },
  //   {
  //     name: "项目管理",
  //     path: "/home",
  //     component: "./Home"
  //   },
  //   {
  //     name: "流程应用",
  //     path: "/access",
  //     component: "./Access"
  //   },
  //   {
  //     name: "任务审核",
  //     path: "/table",
  //     component: "./Table"
  //   }
  // ],
  npmClient: 'pnpm',
});
