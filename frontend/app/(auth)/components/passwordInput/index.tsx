import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type FormData = {
  password: string;
};

type PasswordInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function PasswordInput({ register, errors }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-0">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          {...register("password")}
          aria-invalid={Boolean(errors.password)}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? (
            <IconEyeOff className="text-zinc-400" size={20} stroke={2} />
          ) : (
            <IconEye
              className="text-zinc-400 hover:bg-zinc-200 rounded-md"
              size={20}
              stroke={2}
            />
          )}
        </button>
      </div>

      {errors.password?.message && (
        <p className="mt-1 text-sm text-red-700">{errors.password.message}</p>
      )}
    </div>
  );
}
