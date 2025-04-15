/*
  Warnings:

  - You are about to drop the column `profile_id` on the `profiles-people` table. All the data in the column will be lost.
  - You are about to drop the column `saved_profile_id` on the `profiles-people` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `profiles-people` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[saved_user_id]` on the table `profiles-people` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `saved_user_id` to the `profiles-people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `profiles-people` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles-people" DROP CONSTRAINT "profiles-people_profile_id_fkey";

-- DropIndex
DROP INDEX "profiles-people_profile_id_key";

-- DropIndex
DROP INDEX "profiles-people_saved_profile_id_key";

-- AlterTable
ALTER TABLE "profiles-people" DROP COLUMN "profile_id",
DROP COLUMN "saved_profile_id",
ADD COLUMN     "saved_user_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles-people_user_id_key" ON "profiles-people"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles-people_saved_user_id_key" ON "profiles-people"("saved_user_id");

-- AddForeignKey
ALTER TABLE "profiles-people" ADD CONSTRAINT "profiles-people_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
