import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
});
