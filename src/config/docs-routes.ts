import { OpenAPIHono } from "@hono/zod-openapi";
import * as userDocs from "../modules/users/users.docs";
import { apiReference as scalarOpenapiUI } from "@scalar/hono-api-reference";

const apiDocs = new OpenAPIHono();

apiDocs.openapi(userDocs.register, (c) => {
  const { email, name } = c.req.valid("json");
  return c.json({ id: "id", email, name }, 200);
});

apiDocs.doc("/", {
  openapi: "3.0.0",
  info: {
    version: "0.1.0",
    title: "MyMail API",
  },
});

export const docsUI = () =>
  scalarOpenapiUI({
    spec: { url: "/openapi" },
    baseServerURL: "http://localhost:3000/api",
    layout: "modern",
    theme: "purple",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
  });

export default apiDocs;
