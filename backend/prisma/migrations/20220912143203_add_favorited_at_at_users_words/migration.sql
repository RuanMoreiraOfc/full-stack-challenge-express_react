/*
  Warnings:

  - You are about to drop the column `created_at` on the `users_words` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_words" DROP COLUMN "created_at",
ADD COLUMN     "favorited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
