/*
  Warnings:

  - You are about to drop the column `securityBreach` on the `Device` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "location" TEXT,
    "occupancy" INTEGER,
    "occupancyLimit" INTEGER,
    "connectedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateAt" DATETIME,
    "lastStatusUpdate" DATETIME,
    "doorOpen" BOOLEAN,
    "motionDetected" BOOLEAN,
    "armed" BOOLEAN DEFAULT false,
    "lastCheckedAt" DATETIME
);
INSERT INTO "new_Device" ("connectedAt", "createdAt", "doorOpen", "id", "lastCheckedAt", "lastStatusUpdate", "lastUpdateAt", "location", "motionDetected", "name", "occupancy", "occupancyLimit") SELECT "connectedAt", "createdAt", "doorOpen", "id", "lastCheckedAt", "lastStatusUpdate", "lastUpdateAt", "location", "motionDetected", "name", "occupancy", "occupancyLimit" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
