import { z } from "zod";

export const signInDto = z.object({
  email: z.string().trim().min(3),
  password: z.string().trim().min(6),
});

export type SignInDto = z.infer<typeof signInDto>;
