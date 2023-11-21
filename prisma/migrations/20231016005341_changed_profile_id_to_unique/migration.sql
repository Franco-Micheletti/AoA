/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_profile_id_key" ON "Player"("profile_id");
