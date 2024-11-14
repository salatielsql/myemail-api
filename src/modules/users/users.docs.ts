import { createRoute } from "@hono/zod-openapi";
import { RegisterPayload, RegisterResponse } from "./users.schema";

export const register = createRoute({
  method: "post",
  path: "/users/register",
  description: "Register a new user",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterPayload,
        },
      },
      required: true,
      description: "The user to create",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RegisterResponse,
        },
      },
      description: "User registered successfully",
    },
    409: {
      description: "User already exists",
    },
    500: {
      description: "Internal server error",
    },
  },
});
