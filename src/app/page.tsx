import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "@/app/logout/actions";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="max-w-2xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4">Personal Dashboard</h1>
      <p className="mb-6">
        Logged in as: <b>{user.email}</b>
      </p>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          href="/datasets"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
            />
          </svg>
          Datasets
        </Link>

        <Link
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          href="/upload"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v12m0-12l4 4m-4-4L8 7M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3"
            />
          </svg>
          Upload
        </Link>
      </div>

      <form action={logout}>
        <button className="underline" type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}
