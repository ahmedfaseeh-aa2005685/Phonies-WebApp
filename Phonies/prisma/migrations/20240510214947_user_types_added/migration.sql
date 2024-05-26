-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phones" TEXT,
    "transaction" TEXT,
    "companyName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'seller'
);
INSERT INTO "new_Seller" ("bankAccount", "companyName", "id", "password", "phones", "transaction", "username") SELECT "bankAccount", "companyName", "id", "password", "phones", "transaction", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "transaction" TEXT,
    "surname" TEXT NOT NULL,
    "money" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'customer'
);
INSERT INTO "new_Customer" ("id", "money", "password", "surname", "transaction", "username") SELECT "id", "money", "password", "surname", "transaction", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'admin'
);
INSERT INTO "new_Admin" ("id", "password", "username") SELECT "id", "password", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
