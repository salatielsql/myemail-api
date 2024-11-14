import { Hono } from "hono";
import { users } from "../modules/users";
import { HTTPException } from "hono/http-exception";

const apiRoutes = new Hono();

apiRoutes.route("/users", users);

apiRoutes.notFound(() => {
  throw new HTTPException(404, {
    message: "Not Found",
  });
});

apiRoutes.onError((err, c) => {
  console.error(err);
  c.status(err instanceof HTTPException ? err.status : 500);
  return c.json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
});

export default apiRoutes;
