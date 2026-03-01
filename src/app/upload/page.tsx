import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { uploadCsv } from "./actions";

export default async function UploadPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Upload CSV</h1>

      <form action={uploadCsv} className="space-y-4">
        <input
          name="name"
          placeholder="Dataset name (e.g. CPU Temp)"
          required
          className="w-full border p-2"
        />

        <input
          name="file"
          type="file"
          accept=".csv,.xlsx,.xls"
          required
          className="w-full"
        />

        <button
          className="w-full bg-slate-900 text-white p-2 hover:bg-slate-800"
          type="submit"
        >
          Upload & Import
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        CSV must have headers: <code>timestamp,value</code>
      </p>
    </main>
  );
}
