"use client";

import { useRouter } from "next/navigation";

export function AdminStatusButtons({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  async function update(status: "approved" | "rejected") {
    await fetch(`/api/admin/application/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => update("approved")} className="rounded bg-green-700 px-4 py-2 text-white">Approve</button>
      <button onClick={() => update("rejected")} className="rounded bg-red-700 px-4 py-2 text-white">Reject</button>
    </div>
  );
}
