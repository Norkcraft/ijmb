"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const fullName = String(fd.get("full_name"));
    const phone = String(fd.get("phone"));
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } }
    });
    if (error) return setError(error.message);
    if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, full_name: fullName, phone });
    }
    router.push("/verify-email");
  }
  return <AuthForm title="Create Account" onSubmit={onSubmit} error={error} includeMeta />;
}

export function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    });
    if (error) return setError(error.message);
    router.push("/portal");
    router.refresh();
  }
  return <AuthForm title="Sign In" onSubmit={onSubmit} error={error} />;
}

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email"));
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    });
    setMessage("Password reset link sent to your email.");
  }
  return (
    <AuthForm title="Forgot Password" onSubmit={onSubmit}>
      {message && <p className="text-green-700">{message}</p>}
    </AuthForm>
  );
}

export function ResetPasswordForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password"));
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setError(error.message);
    setMessage("Password updated. You can now log in.");
  }
  return (
    <AuthForm title="Set New Password" onSubmit={onSubmit} error={error} passwordOnly>
      {message && <p className="text-green-700">{message}</p>}
    </AuthForm>
  );
}

function AuthForm({
  title,
  onSubmit,
  error,
  includeMeta,
  passwordOnly,
  children
}: {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  error?: string;
  includeMeta?: boolean;
  passwordOnly?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {!passwordOnly && <input required name="email" type="email" placeholder="Email" className="w-full rounded border p-2" />}
      {includeMeta && <input required name="full_name" placeholder="Full Name" className="w-full rounded border p-2" />}
      {includeMeta && <input required name="phone" placeholder="Phone" className="w-full rounded border p-2" />}
      <input required name="password" type="password" placeholder="Password" className="w-full rounded border p-2" />
      {error && <p className="text-red-600">{error}</p>}
      {children}
      <button className="w-full rounded bg-brand py-2 text-white">Continue</button>
    </form>
  );
}
