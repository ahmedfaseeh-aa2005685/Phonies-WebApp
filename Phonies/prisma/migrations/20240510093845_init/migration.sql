/*
  Warnings:

  - Added the required column `quantity` to the `Phone` table without a default value. This is not possible if the table is not empty.

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
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Phone_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("brand", "featured", "id", "img", "name", "price", "seller", "sold", "storage") SELECT "brand", "featured", "id", "img", "name", "price", "seller", "sold", "storage" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
