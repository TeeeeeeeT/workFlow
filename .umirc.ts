import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/login", component: "login/index" },
    {
      path: "/systemManage",
      // 嵌套路由
      routes: [
        {
          path: "/systemManage/visitLogList",
          component: "systemManage/log/visitLogList"
        }
      ]
    },
    { path: "/docs", component: "docs" },
    { path: "/schemeList", component: "workflow/scheme/list" },
    { path: "/taskList", component: "workflow/task/list" },

  ],
  npmClient: 'pnpm',
  extraBabelPlugins: [
    ['import', { libraryName: "cmao-ui", style: true }],
  ],
  // mfsu: false
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  proxy: {
    '/api': {
      'target': 'http://localhost:5002/',
      // 'target': 'http://120.132.122.154:5002/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    }
  },
});
