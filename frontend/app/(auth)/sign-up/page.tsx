"use client";
import { useRouter } from "next/dist/client/components/navigation";

export default function SignUpPage() {
  const router = useRouter();
  return (
    <form action="">
      <div className="flex flex-col items-center justify-center min-h-screen gap-10">
        <h1 className="text-2xl text-blue-500 font-bold">Criar conta</h1>
        <p>
          Já tem conta?{" "}
          <a
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/sign-in")}
          >
            Entrar
          </a>
        </p>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Cadastrar
        </button>
      </div>
    </form>
  );
}
