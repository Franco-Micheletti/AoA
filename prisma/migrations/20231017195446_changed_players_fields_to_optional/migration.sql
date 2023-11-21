-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "rating_rm_solo" DROP NOT NULL,
ALTER COLUMN "rating_rm_team" DROP NOT NULL,
ALTER COLUMN "highest_rating_rm_solo" DROP NOT NULL,
ALTER COLUMN "highest_rating_rm_team" DROP NOT NULL,
ALTER COLUMN "last_update_at" DROP NOT NULL;
