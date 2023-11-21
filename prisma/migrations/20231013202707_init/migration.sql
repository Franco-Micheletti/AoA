-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "map_name" TEXT NOT NULL,
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
    "team_id" INTEGER NOT NULL,
    "civ_id" INTEGER NOT NULL,
    "old_rating" INTEGER NOT NULL,
    "new_rating" INTEGER NOT NULL,

    CONSTRAINT "GamePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "country_code" TEXT NOT NULL,
    "rating_rm_solo" INTEGER NOT NULL,
    "rating_rm_team" INTEGER NOT NULL,
    "highest_rating_rm_solo" INTEGER NOT NULL,
    "highest_rating_rm_team" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayer_player_id_key" ON "GamePlayer"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayer_game_id_key" ON "GamePlayer"("game_id");

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
