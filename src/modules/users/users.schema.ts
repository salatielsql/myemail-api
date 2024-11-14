import { z } from "@hono/zod-openapi";

export const RegisterPayload = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .openapi("RegisterPayload");

export const RegisterResponse = RegisterPayload.omit({
  password: true,
})
  .extend({ id: z.number() })
  .openapi("RegisterResponse");

export const loginPayload = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
