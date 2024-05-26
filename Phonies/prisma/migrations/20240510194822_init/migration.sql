/*
  Warnings:

  - Added the required column `transaction` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phones` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "featured" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Phone" ("brand", "featured", "id", "img", "name", "price", "quantity", "seller", "sold", "storage", "year") SELECT "brand", "featured", "id", "img", "name", "price", "quantity", "seller", "sold", "storage", "year" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "money" INTEGER NOT NULL
);
INSERT INTO "new_Customer" ("id", "money", "password", "surname", "username") SELECT "id", "money", "password", "surname", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
CREATE TABLE "new_Seller" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phones" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL
);
INSERT INTO "new_Seller" ("bankAccount", "companyName", "id", "password", "username") SELECT "bankAccount", "companyName", "id", "password", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_id_key" ON "Seller"("id");
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL,
    "buyer" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" INTEGER NOT NULL
);
INSERT INTO "new_Transaction" ("buyer", "date", "id", "phone", "quantity", "seller", "total") SELECT "buyer", "date", "id", "phone", "quantity", "seller", "total" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
