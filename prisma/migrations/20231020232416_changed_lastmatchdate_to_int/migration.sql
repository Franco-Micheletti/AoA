/*
  Warnings:

  - Changed the type of `lastmatchdate` on the `PlayerLeaderboardStats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PlayerLeaderboardStats" DROP COLUMN "lastmatchdate",
ADD COLUMN     "lastmatchdate" INTEGER NOT NULL;
