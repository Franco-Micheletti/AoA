/*
  Warnings:

  - Added the required column `steam_id` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "steam_id" INTEGER NOT NULL;
