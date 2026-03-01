# Personal Dashboard (MVP)

這是一個用來練習 **從 0 到可上線（0 → 1）完整流程** 的 Side Project。

專案重點不在商業邏輯完整性，而在於：
- 技術選型
- 資料流設計
- Auth / ORM / Server Actions
- 本機開發 → Build → 上線前準備

---

## 🎯 專案目標

建立一個「個人數據監控 Dashboard」的 MVP，讓使用者可以：

- 註冊 / 登入
- 上傳 CSV / Excel（`.xlsx`）
- 將時間序列資料寫入資料庫
- 查看 Dataset 詳細頁
- 顯示基本統計與折線圖
- 為部署到 Vercel 做好準備

---

## ✅ 已完成的功能（目前進度）

### 1. 專案基礎
- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- Git + GitHub

---

### 2. 使用者系統（簡化 Auth）
- Signup / Login / Logout
- Session-based authentication
- Server Action 驗證登入狀態

**技術**
- Prisma ORM
- SQLite（本地開發）
- bcryptjs（密碼雜湊）

---

### 3. 資料模型（Prisma）
已建立模型：

- User
- Session
- Dataset
- DataPoint

關聯關係：

- User 1 → N Dataset
- Dataset 1 → N DataPoint
- User 1 → N Session

---

### 4. CSV / Excel 上傳
- `/upload` 頁面
- 支援：
  - `.csv`
  - `.xlsx / .xls`
- 欄位格式：
  - `timestamp`
  - `value`
- 上傳後轉為 `DataPoint` 寫入資料庫

---

### 5. Dataset 詳細頁（動態路由）
- 路徑：`/datasets/[id]`
- 功能：
  - Dataset 基本資訊
  - Rows 數量
  - Min / Max / Avg
  - 前幾筆資料 Preview
  - 折線圖（時間序列）

---

### 6. 折線圖（Time Series）
- X 軸：timestamp
- Y 軸：value
- 已處理 Excel / UTC / JS Date 對齊問題

---

### 7. Build 驗證
- `pnpm build` 成功
- Production build 無錯誤
- Dynamic / Static routes 正確

---

## 🛠 技術總覽

**Frontend**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend / Server**
- Next.js Server Actions
- Prisma ORM

**Database**
- SQLite（本地）
- 已評估雲端方案（Neon / Turso）

**Tooling**
- pnpm
- Prisma Studio
- GitHub

---

## 🚧 尚未完成（下一步）

- 雲端資料庫（Neon）
- Vercel 部署
- Production 環境變數
- 基本錯誤處理 UI
- Dataset 管理（刪除 / 更新）
- README 架構圖與流程圖

---

## 🚀 Getting Started（本機開發）

> 本專案使用 create-next-app 初始化

### 開發前置需求

在本機開發這個專案前，請先安裝以下工具：

| 工具 | 必要 | 用途 | 建議版本 |
| --- | --- | --- | --- |
| `Node.js` | ✅ | 執行 Next.js / React / Prisma | `20.x` 以上 |
| `pnpm` | ✅ | 安裝與管理專案套件 | `9.x` 或相容版本 |
| `Git` | 建議 | 版本控制與同步 GitHub | 最新穩定版 |
| `SQLite` | 不需要另外安裝 | 本專案本機開發使用 Prisma + SQLite 檔案資料庫 | - |

> 備註：本專案的資料庫是透過 `DATABASE_URL=file:./dev.db` 直接使用 SQLite 檔案，因此本機通常不需要額外安裝 SQLite Server。

### 安裝專案套件

完成前置工具安裝後，在專案根目錄執行：

```bash
pnpm install
```

這個指令會安裝專案實際使用到的套件，例如：

- `next`
- `react`
- `react-dom`
- `prisma`
- `@prisma/client`
- `typescript`
- `tailwindcss`
- `bcryptjs`
- `xlsx`
- `recharts`

### 開發環境啟動

```bash
pnpm dev
```

啟動後預設會在 `http://localhost:3000`。
