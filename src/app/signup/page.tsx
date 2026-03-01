import { signup } from "./actions";

export default function SignupPage() {
  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>

      <form action={signup} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white p-2 hover:bg-slate-800"
        >
          Create account
        </button>
      </form>
    </main>
  );
}
