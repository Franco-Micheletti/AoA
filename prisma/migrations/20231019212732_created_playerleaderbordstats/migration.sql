/*
  Warnings:

  - You are about to drop the column `highest_rating_rm_solo` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `highest_rating_rm_team` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `rating_rm_solo` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `rating_rm_team` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "highest_rating_rm_solo",
DROP COLUMN "highest_rating_rm_team",
DROP COLUMN "rating_rm_solo",
DROP COLUMN "rating_rm_team";

-- CreateTable
CREATE TABLE "PlayerLeaderboardStats" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "leaderboard_id" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "disputes" INTEGER NOT NULL,
    "drops" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "ranktotal" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "regionrank" INTEGER NOT NULL,
    "regionranktotal" INTEGER NOT NULL,
    "lastmatchdate" TIMESTAMP(3) NOT NULL,
    "highestrank" INTEGER NOT NULL,
    "highestrating" INTEGER NOT NULL,

    CONSTRAINT "PlayerLeaderboardStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerLeaderboardStats" ADD CONSTRAINT "PlayerLeaderboardStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
