/*
  Warnings:

  - Added the required column `last_update_at` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "last_update_at" TIMESTAMP(3) NOT NULL;
