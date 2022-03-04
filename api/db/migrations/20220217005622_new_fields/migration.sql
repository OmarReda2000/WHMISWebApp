/*
  Warnings:

  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "location" TEXT,
    "occupancy" INTEGER,
    "connectedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateAt" DATETIME,
    "lastStatusUpdate" DATETIME,
    "doorOpen" BOOLEAN,
    "motionDetected" BOOLEAN,
    "lastCheckedAt" DATETIME
);
INSERT INTO "new_Device" ("connectedAt", "createdAt", "id", "lastCheckedAt", "lastStatusUpdate", "lastUpdateAt", "location", "name", "occupancy") SELECT "connectedAt", "createdAt", "id", "lastCheckedAt", "lastStatusUpdate", "lastUpdateAt", "location", "name", "occupancy" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
