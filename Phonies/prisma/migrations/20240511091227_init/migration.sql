/*
  Warnings:

  - You are about to drop the column `transaction` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `transaction` on the `Seller` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "money" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'customer',
    "address" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("address", "id", "money", "password", "surname", "type", "username") SELECT "address", "id", "money", "password", "surname", "type", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
CREATE TABLE "new_Seller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'seller'
);
INSERT INTO "new_Seller" ("bankAccount", "companyName", "id", "password", "type", "username") SELECT "bankAccount", "companyName", "id", "password", "type", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL,
    "buyer" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" INTEGER NOT NULL,
    CONSTRAINT "Transaction_buyer_fkey" FOREIGN KEY ("buyer") REFERENCES "Customer" ("username") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transaction_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("buyer", "date", "id", "phone", "quantity", "seller", "total") SELECT "buyer", "date", "id", "phone", "quantity", "seller", "total" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
CREATE TABLE "new_Phone" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
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
