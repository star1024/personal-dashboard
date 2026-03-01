"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteDataset(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const datasetId = String(formData.get("datasetId") || "").trim();
  if (!datasetId) {
    throw new Error("datasetId is required");
  }

  await prisma.dataset.deleteMany({
    where: { id: datasetId, userId: user.id },
  });

  revalidatePath("/datasets");
}

