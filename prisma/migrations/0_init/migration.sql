-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "unique_id" INTEGER NOT NULL,
    "map_name" TEXT,
    "max_player" INTEGER NOT NULL,
    "matchtype_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "started" INTEGER NOT NULL,
    "finished" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayer" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "result_id" INTEGER NOT NULL,
    "team_id" INTEGER,
    "color_id" INTEGER,
    "civ_id" INTEGER,
    "old_rating" INTEGER NOT NULL,
    "new_rating" INTEGER NOT NULL,

    CONSTRAINT "GamePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "steam_id" TEXT,
    "country_code" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "last_update_at" TIMESTAMP(3),

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

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
    "lastmatchdate" INTEGER NOT NULL,
    "highestrank" INTEGER NOT NULL,
    "highestrating" INTEGER NOT NULL,

    CONSTRAINT "PlayerLeaderboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_unique_id_key" ON "Game"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_profile_id_key" ON "Player"("profile_id");

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerLeaderboardStats" ADD CONSTRAINT "PlayerLeaderboardStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

