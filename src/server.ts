import { Hono } from "hono";

import apiRoutes from "./config/api-routes";
import apiDocs, { docsUI } from "./config/docs-routes";

const server = new Hono();

server.route("/api", apiRoutes);
server.route("/openapi", apiDocs);
server.get("/docs", docsUI());

export default server;
