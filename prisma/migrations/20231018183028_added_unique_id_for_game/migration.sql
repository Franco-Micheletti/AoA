/*
  Warnings:

  - A unique constraint covering the columns `[unique_id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_id` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "unique_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_unique_id_key" ON "Game"("unique_id");
