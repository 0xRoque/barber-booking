-- CreateTable
CREATE TABLE "BarberConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "workStartTime" TEXT NOT NULL,
    "workEndTime" TEXT NOT NULL,
    "lunchStart" TEXT NOT NULL,
    "lunchEnd" TEXT NOT NULL,
    "slotDuration" INTEGER NOT NULL,
    "workDays" TEXT NOT NULL,
    CONSTRAINT "BarberConfig_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BarberConfig_barberId_key" ON "BarberConfig"("barberId");
