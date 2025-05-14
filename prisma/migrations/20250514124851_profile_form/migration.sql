/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "profile_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "forms_profile_id_key" ON "forms"("profile_id");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
