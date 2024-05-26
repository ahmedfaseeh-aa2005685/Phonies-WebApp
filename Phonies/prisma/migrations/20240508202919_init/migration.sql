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
    CONSTRAINT "Phone_seller_fkey" FOREIGN KEY ("seller") REFERENCES "Seller" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("brand", "id", "img", "name", "price", "seller", "sold", "storage") SELECT "brand", "id", "img", "name", "price", "seller", "sold", "storage" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_id_key" ON "Phone"("id");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL,
    "currentListedPhone" INTEGER NOT NULL,
    "soldPhones" INTEGER NOT NULL,
    "numberOfSellers" INTEGER NOT NULL,
    "numberOfCustomers" INTEGER NOT NULL,
    "vistedToday" INTEGER NOT NULL DEFAULT 0,
    "listedToday" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Stat" ("currentListedPhone", "id", "numberOfCustomers", "numberOfSellers", "soldPhones") SELECT "currentListedPhone", "id", "numberOfCustomers", "numberOfSellers", "soldPhones" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_id_key" ON "Stat"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
