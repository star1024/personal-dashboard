import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteDatasetButton from "./DeleteDatasetButton";
import { deleteDataset } from "./actions";

export default async function DatasetsIndexPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const datasets = await prisma.dataset.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
      _count: { select: { points: true } },
    },
  });

  return (
    <main className="max-w-2xl mx-auto mt-20">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Datasets</h1>
        <Link
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          href="/upload"
        >
          Upload
        </Link>
      </div>

      {datasets.length === 0 ? (
        <p className="text-gray-600">
          No datasets yet.{" "}
          <Link className="underline" href="/upload">
            Upload your first one
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y border rounded-md">
          {datasets.map((d) => (
            <li key={d.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Link className="font-medium underline" href={`/datasets/${d.id}`}>
                  {d.name}
                </Link>
                <div className="text-sm text-gray-600">
                  {d._count.points} rows •{" "}
                  {new Date(d.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link className="text-sm underline" href={`/datasets/${d.id}`}>
                  View
                </Link>
                <DeleteDatasetButton datasetId={d.id} action={deleteDataset} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
