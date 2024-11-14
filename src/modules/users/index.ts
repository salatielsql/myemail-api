import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";

import { Secure } from "../../helpers/secure";
import { loginPayload, RegisterPayload } from "./users.schema";
import { UsersRepository } from "./users.repository";
import { db } from "../../config/db";

const users = new Hono();
const User = new UsersRepository(db);

users.post(
  "/register",
  zValidator("json", RegisterPayload, (result, c) => {
    if (!result.success) {
      c.json({
        success: false,
        message: "Validation Error",
        errors: result.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors,
      });
    }
  }),
  async (c) => {
    const data = c.req.valid("json");

    const [userExists] = await User.getUserByEmail(data.email);

    if (userExists) {
      throw new HTTPException(409, {
        message: "User already exists",
      });
    }

    const userCreated = await User.createUser(data);

    return c.json({
      success: true,
      data: userCreated,
    });
  }
);

users.post(
  "/login",
  zValidator("json", loginPayload, (result, c) => {
    console.log(result);
    if (!result.success) {
      c.json({
        success: false,
        message: "Validation Error",
        errors: result.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors,
      });
    }
  }),
  (c) => {
    const data = c.req.valid("json");

    const tokenUUID = Secure.generateUUID();

    return c.json({
      success: true,
      sessionToken: tokenUUID,
      message: "Logged in!",
    });
  }
);

export { users };
