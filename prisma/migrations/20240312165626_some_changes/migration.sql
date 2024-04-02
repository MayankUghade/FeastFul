/*
  Warnings:

  - Made the column `location` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `date` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "location" SET NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;
