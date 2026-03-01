import { logout } from "./actions";

export default function LogoutPage() {
  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Logout</h1>
      <form action={logout}>
        <button
          className="bg-slate-900 text-white px-4 py-2 hover:bg-slate-800"
          type="submit"
        >
          Confirm logout
        </button>
      </form>
    </main>
  );
}
