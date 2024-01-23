import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/login" },
    { path: "/docs", component: "docs" },
    { path: "/schemeList", component: "workflow/scheme/list" }
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
  }
});
