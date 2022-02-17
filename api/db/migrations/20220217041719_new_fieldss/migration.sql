-- AlterTable
ALTER TABLE "Device" ADD COLUMN "occupancyLimit" INTEGER;
ALTER TABLE "Device" ADD COLUMN "securityBreach" BOOLEAN DEFAULT false;
