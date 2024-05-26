/*
  Warnings:

  - You are about to alter the column `price` on the `Phone` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "storage" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Phone_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("brand", "featured", "id", "img", "name", "price", "quantity", "seller", "sold", "storage", "year") SELECT "brand", "featured", "id", "img", "name", "price", "quantity", "seller", "sold", "storage", "year" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
