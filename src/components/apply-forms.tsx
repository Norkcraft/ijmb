"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

async function upsertSection(section: "personal_data" | "academic_data" | "program_data", payload: Record<string, string>) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase.from("applications").select("id").eq("user_id", user.id).maybeSingle();
  if (!existing) {
    await supabase.from("applications").insert({ user_id: user.id, status: "draft", [section]: payload });
  } else {
    await supabase.from("applications").update({ [section]: payload }).eq("id", existing.id);
  }
}

function SectionForm({ title, section, fields, next }: { title: string; section: "personal_data" | "academic_data" | "program_data"; fields: string[]; next: string; }) {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, string> = {};
    const fd = new FormData(e.currentTarget);
    fields.forEach((f) => (data[f] = String(fd.get(f) ?? "")));
    try {
      await upsertSection(section, data);
      router.push(next);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return <form onSubmit={onSubmit} className="card space-y-4"><h1 className="text-2xl font-semibold">{title}</h1>{fields.map((f)=><input key={f} required name={f} placeholder={f.replaceAll("_"," ")} className="w-full rounded border p-2" />)}{error&&<p className="text-red-600">{error}</p>}<button className="rounded bg-brand px-4 py-2 text-white">Save & Continue</button></form>;
}

export function PersonalForm() { return <SectionForm title="Personal Information" section="personal_data" fields={["first_name", "last_name", "dob", "address"]} next="/apply/academics" />; }
export function AcademicsForm() { return <SectionForm title="Academic History" section="academic_data" fields={["o_level_school", "o_level_year", "subjects"]} next="/apply/program" />; }
export function ProgramForm() { return <SectionForm title="Program Selection" section="program_data" fields={["first_choice", "second_choice", "study_center"]} next="/apply/review" />; }

export function ReviewActions() {
  const [message, setMessage] = useState("");
  async function submitApplication() {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    await supabase.from("applications").update({ status: "submitted" }).eq("user_id", userData.user.id);
    setMessage("Application submitted successfully.");
  }

  return (
    <div className="space-y-3">
      <button onClick={submitApplication} className="rounded bg-brand px-4 py-2 text-white">Submit Application</button>
      <Link href="/apply/pay" className="block text-brand underline">Proceed to Form Fee Payment</Link>
      {message && <p className="text-green-700">{message}</p>}
    </div>
  );
}

export function PayButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function beginPayment() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "FORM_FEE" })
    });
    if (!res.ok) {
      setLoading(false);
      return setError("Could not initialize payment.");
    }
    const data = await res.json();
    window.location.href = data.authorization_url;
  }
  return <div className="space-y-3"><button onClick={beginPayment} disabled={loading} className="rounded bg-brand px-4 py-2 text-white">{loading ? "Redirecting..." : "Pay NGN 5,000"}</button>{error && <p className="text-red-600">{error}</p>}</div>;
}
