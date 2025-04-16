/*
  Warnings:

  - Made the column `position` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postedDate` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "postedDate" SET NOT NULL;
