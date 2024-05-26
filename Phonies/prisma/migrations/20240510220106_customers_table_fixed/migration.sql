/*
  Warnings:

  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "transaction" TEXT,
    "surname" TEXT NOT NULL,
    "money" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'customer',
    "address" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("id", "money", "password", "surname", "transaction", "type", "username") SELECT "id", "money", "password", "surname", "transaction", "type", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
