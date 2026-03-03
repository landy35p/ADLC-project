# 資料庫綱要設計 (Database Schema)

使用 Prisma Schema 語法進行定義。

```prisma
// This is your Prisma schema file

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id          String      @id @default(uuid())
  username    String      @unique
  email       String      @unique
  preference  Preference?
  createdAt   DateTime    @default(now())
}

model Preference {
  id             String   @id @default(uuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id])
  tags           String   // JSON stringified tags: ["sport", "food"]
  regions        String   // JSON stringified regions: ["Taipei"]
  maxBudget      Float    @default(0)
  updatedAt      DateTime @updatedAt
}

model Activity {
  id             String   @id @default(uuid())
  externalId     String   // 原始平台的 ID
  sourcePlatform String   // 來源平台名稱 (e.g., "Klook", "Gov")
  name           String
  description    String?
  price          Float
  startTime      DateTime?
  location       String
  originalUrl    String
  tags           String   // JSON stringified 標籤，用於與使用者偏好匹配
  createdAt      DateTime @default(now())

  // 去重索引：同一平台不能有重複的外部 ID
  @@unique([sourcePlatform, externalId])
}
```
