import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/login" },
    { path: "/docs", component: "docs" },
    { path: "/schemeList", component: "workflow/scheme/list" },
    { path: "/schemeList2", component: "workflow/scheme/list2" },
    { path: "/table", component: "table/index" }
  ],
  npmClient: 'pnpm',
});
