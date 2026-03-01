import DatasetLineChart from "@/components/DatasetLineChart";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DatasetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dataset = await prisma.dataset.findFirst({
    where: { id, userId: user.id },
  });

  if (!dataset) {
    return (
      <main className="max-w-2xl mx-auto mt-20">
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="mt-2 text-gray-600">
          Dataset not found or you don&apos;t have access.
        </p>
      </main>
    );
  }

  const points = await prisma.dataPoint.findMany({
    where: { datasetId: dataset.id },
    orderBy: { timestamp: "asc" },
    select: { timestamp: true, value: true },
  });

  const chartData = points.map((p) => ({
    ts: p.timestamp.getTime(), // number (ms)
    value: p.value,
  }));


  const values = points.map((p) => p.value);
  const count = values.length;

  let min: number | null = null;
  let max: number | null = null;
  let avg: number | null = null;

  if (count > 0) {
    min = Math.min(...values);
    max = Math.max(...values);
    avg = values.reduce((a, b) => a + b, 0) / count;
  }

  return (
    <main className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-2">{dataset.name}</h1>

      <p className="text-sm text-gray-600 mb-6">
        Dataset ID: <code>{dataset.id}</code>
        <br />
        Rows: {count}
      </p>

      <div className="space-y-2">
        <div>Min: {min === null ? "-" : min}</div>
        <div>Max: {max === null ? "-" : max}</div>
        <div>Avg: {avg === null ? "-" : avg.toFixed(3)}</div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Preview (first 5 rows)</h2>
        <pre className="text-xs bg-slate-900/40 p-3 rounded">
          {JSON.stringify(points.slice(0, 5), null, 2)}
        </pre>
      </div>

      <p className="mt-6">
        <a className="underline" href="/upload">
          Upload another CSV
        </a>
      </p>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Trend</h2>
        <DatasetLineChart data={chartData} />
      </div>

    </main>
  );
}
