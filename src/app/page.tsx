import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "@/app/logout/actions";

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

      <form action={logout}>
        <button className="underline" type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}
