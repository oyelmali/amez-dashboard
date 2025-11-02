import { onRequest as __api___path___ts_onRequest } from "C:\\Users\\oyelmali\\Desktop\\AmazeyAI\\test-readme\\amez-dashboard\\functions\\api\\[[path]].ts"

export const routes = [
    {
      routePath: "/api/:path*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___path___ts_onRequest],
    },
  ]