/*
  Warnings:

  - Added the required column `color_id` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GamePlayer" ADD COLUMN     "color_id" INTEGER NOT NULL;
