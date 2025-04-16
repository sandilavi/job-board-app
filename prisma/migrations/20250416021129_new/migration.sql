/*
  Warnings:

  - You are about to drop the column `companyLogo` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "companyLogo",
DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "position" TEXT,
ADD COLUMN     "postedDate" TEXT;
