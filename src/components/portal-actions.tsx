"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function ProfileForm({ fullName, phone }: { fullName?: string | null; phone?: string | null }) {
  const [msg, setMsg] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    await supabase.from("profiles").update({ full_name: fd.get("full_name"), phone: fd.get("phone") }).eq("id", u.user.id);
    setMsg("Profile updated.");
  }
  return <form onSubmit={onSubmit} className="card space-y-3"><input className="w-full rounded border p-2" name="full_name" defaultValue={fullName ?? ""} /><input className="w-full rounded border p-2" name="phone" defaultValue={phone ?? ""} /><button className="rounded bg-brand px-4 py-2 text-white">Save</button>{msg&&<p className="text-green-700">{msg}</p>}</form>;
}

export function SecurityForm() {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function changePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password"));
    const supabase = createClient();
    await supabase.auth.updateUser({ password });
    setMsg("Password updated.");
  }
  async function logoutAll() {
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/login");
  }
  return <div className="space-y-4"><form onSubmit={changePassword} className="card space-y-3"><h2 className="text-xl font-semibold">Change Password</h2><input required name="password" type="password" className="w-full rounded border p-2" placeholder="New password"/><button className="rounded bg-brand px-4 py-2 text-white">Update Password</button>{msg&&<p className="text-green-700">{msg}</p>}</form><button onClick={logoutAll} className="rounded bg-slate-800 px-4 py-2 text-white">Logout all sessions</button></div>;
}
