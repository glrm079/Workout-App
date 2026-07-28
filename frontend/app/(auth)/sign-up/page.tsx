"use client";
import SignUpForm from "../components/signUpForm";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden min-h-svh overflow-hidden bg-[#120404] lg:block">
        <div className="animate-float absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-red-600/60 blur-[120px]" />

        <div className="animate-float-slow absolute -right-40 top-1/3 h-[550px] w-[550px] rounded-full bg-red-500/50 blur-[140px]" />

        <div className="animate-float absolute -bottom-40 left-1/4 h-[450px] w-[450px] rounded-full bg-red-700/50 blur-[130px]" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-black/50" />
      </div>
    </div>
  );
}
