"use server";

import * as XLSX from "xlsx";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function parseCsv(text: string): Array<{ timestamp: Date; value: number }> {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map((s) => s.trim().toLowerCase());
  const tsIdx = header.indexOf("timestamp");
  const valIdx = header.indexOf("value");
  if (tsIdx === -1 || valIdx === -1) {
    throw new Error("CSV must include headers: timestamp,value");
  }

  const out: Array<{ timestamp: Date; value: number }> = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].trim();
    if (!row) continue;

    const cols = row.split(",").map((s) => s.trim());
    const tsRaw = cols[tsIdx];
    const valRaw = cols[valIdx];

    const ts = new Date(tsRaw);
    const val = Number(valRaw);

    if (Number.isNaN(ts.getTime())) continue;
    if (!Number.isFinite(val)) continue;

    out.push({ timestamp: ts, value: val });
  }

  return out;
}

export async function uploadCsv(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") || "").trim();
  const file = formData.get("file") as File | null;

  if (!name) throw new Error("Dataset name is required");
  if (!file) throw new Error("CSV file is required");

  let points: Array<{ timestamp: Date; value: number }> = [];

  if (file.name.endsWith(".csv")) {
    const text = await file.text();
    points = parseCsv(text);
  } else if (
    file.name.endsWith(".xlsx") ||
    file.name.endsWith(".xls")
  ) {
    const buffer = await file.arrayBuffer();
    points = parseExcel(buffer);
  } else {
    throw new Error("Unsupported file type");
  }


  if (points.length === 0) {
    throw new Error("No valid rows found in CSV");
  }

  const dataset = await prisma.dataset.create({
    data: {
        name,
        userId: user.id,
    },
  });

  await prisma.$transaction(
    points.map((p) =>
      prisma.dataPoint.create({
        data: {
          datasetId: dataset.id,
          timestamp: p.timestamp,
          value: p.value,
        },
      })
    )
  );



  redirect(`/datasets/${dataset.id}`);
}

function parseExcel(buffer: ArrayBuffer): Array<{ timestamp: Date; value: number }> {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // 重要：用 raw: true 才能拿到原始值（數字日期序號）
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { raw: true });

  const out: Array<{ timestamp: Date; value: number }> = [];

  for (const row of rows) {
    const tsRaw = row.timestamp;
    const valRaw = row.value;

    if (tsRaw === undefined || tsRaw === null) continue;
    if (valRaw === undefined || valRaw === null || valRaw === "") continue;

    let ts: Date;

    // ✅ 如果是 Excel 日期序號（number），用 XLSX.SSF.parse_date_code 轉
    if (typeof tsRaw === "number") {
      const dc = XLSX.SSF.parse_date_code(tsRaw);
      if (!dc) continue;
      ts = new Date(dc.y, dc.m - 1, dc.d, dc.H, dc.M, Math.floor(dc.S));
    } else {
      // ✅ 如果是字串日期（例如 2026-02-19T10:00:00）
      ts = new Date(String(tsRaw));
    }

    const val = Number(valRaw);

    if (Number.isNaN(ts.getTime())) continue;
    if (!Number.isFinite(val)) continue;

    out.push({ timestamp: ts, value: val });
  }

  return out;
}

