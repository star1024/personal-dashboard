import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Log in</h1>

      <form action={login} className="space-y-4">
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
          className="w-full bg-slate-900 text-white p-2 hover:bg-slate-800"
          type="submit"
        >
          Log in
        </button>
      </form>

      <p className="mt-4">
        No account? <a className="underline" href="/signup">Sign up</a>
      </p>
    </main>
  );
}
