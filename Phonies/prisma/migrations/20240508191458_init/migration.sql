/*
  Warnings:

  - You are about to drop the column `model` on the `Phone` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,
    CONSTRAINT "Phone_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("brand", "id", "img", "name", "price", "seller", "storage") SELECT "brand", "id", "img", "name", "price", "seller", "storage" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
