/*
  Warnings:

  - Added the required column `img` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL,
    "currentListedPhone" INTEGER NOT NULL,
    "soldPhones" INTEGER NOT NULL,
    "numberOfSellers" INTEGER NOT NULL,
    "numberOfCustomers" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,
    CONSTRAINT "Phone_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("brand", "id", "model", "name", "price", "seller", "storage") SELECT "brand", "id", "model", "name", "price", "seller", "storage" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Stat_id_key" ON "Stat"("id");
