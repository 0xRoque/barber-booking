/*
  Warnings:

  - You are about to drop the `BlockedSlots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `lunchEnd` on the `BarberConfig` table. All the data in the column will be lost.
  - You are about to drop the column `lunchStart` on the `BarberConfig` table. All the data in the column will be lost.
  - You are about to drop the column `slotDuration` on the `BarberConfig` table. All the data in the column will be lost.
  - You are about to drop the column `workDays` on the `BarberConfig` table. All the data in the column will be lost.
  - You are about to drop the column `workEndTime` on the `BarberConfig` table. All the data in the column will be lost.
  - You are about to drop the column `workStartTime` on the `BarberConfig` table. All the data in the column will be lost.
  - Added the required column `weekdayEnd` to the `BarberConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekdayStart` to the `BarberConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekendEnd` to the `BarberConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekendStart` to the `BarberConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BlockedSlots";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DayOff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    CONSTRAINT "DayOff_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "clientId" TEXT,
    CONSTRAINT "Slot_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BarberConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "weekdayStart" TEXT NOT NULL,
    "weekdayEnd" TEXT NOT NULL,
    "weekendStart" TEXT NOT NULL,
    "weekendEnd" TEXT NOT NULL,
    CONSTRAINT "BarberConfig_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BarberConfig" ("barberId", "id") SELECT "barberId", "id" FROM "BarberConfig";
DROP TABLE "BarberConfig";
ALTER TABLE "new_BarberConfig" RENAME TO "BarberConfig";
CREATE UNIQUE INDEX "BarberConfig_barberId_key" ON "BarberConfig"("barberId");
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("clientId", "id", "slotId", "status") SELECT "clientId", "id", "slotId", "status" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_slotId_key" ON "Booking"("slotId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
