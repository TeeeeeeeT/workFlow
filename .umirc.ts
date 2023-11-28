import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/login" },
    { path: "/docs", component: "docs" },
    { path: "/schemeList", component: "workflow/scheme/list" }
  ],
  npmClient: 'pnpm',
});
