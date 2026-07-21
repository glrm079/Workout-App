"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInForm) {
    console.log(data);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-10">
        <h1 className="text-2xl text-blue-500 font-bold">Entrar</h1>
        <p>
          Não tem conta?{" "}
          <a
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/sign-up")}
          >
            Criar conta
          </a>
        </p>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.password && <p>{errors.password.message}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
