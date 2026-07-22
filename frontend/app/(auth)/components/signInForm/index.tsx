"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "../../../shemas/AuthShema";

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInForm() {
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
      <FieldGroup className="typeset typeset-docs">
        <div className="flex flex-col gap-0">
          <h1 className="text-4xl text-zinc-900 font-bold">Entrar</h1>
          <p>
            Não tem conta?{" "}
            <a
              className="text-red-700 hover:underline"
              onClick={() => router.push("/sign-up")}
            >
              Criar conta
            </a>
          </p>
        </div>
        <Field className="flex gap-0">
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>
          )}
        </Field>
        <Field className="flex gap-0">
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            aria-invalid={!!errors.password}
            required
          />

          {errors.password && (
            <p className="text-red-700 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Button className="p-5 bg-red-900 hover:bg-red-950" type="submit">
          Entrar
        </Button>
      </FieldGroup>
    </form>
  );
}
