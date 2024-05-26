-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL,
    "currentListedPhone" INTEGER NOT NULL,
    "soldPhones" INTEGER NOT NULL,
    "numberOfSellers" INTEGER NOT NULL,
    "numberOfCustomers" INTEGER NOT NULL,
    "vistedToday" INTEGER NOT NULL DEFAULT 0,
    "listedToday" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Stat" ("currentListedPhone", "id", "listedToday", "numberOfCustomers", "numberOfSellers", "soldPhones", "vistedToday") SELECT "currentListedPhone", "id", "listedToday", "numberOfCustomers", "numberOfSellers", "soldPhones", "vistedToday" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_id_key" ON "Stat"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
