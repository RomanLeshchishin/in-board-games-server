/*
  Warnings:

  - A unique constraint covering the columns `[user_id,saved_user_id]` on the table `profiles-people` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profiles-people_user_id_saved_user_id_key" ON "profiles-people"("user_id", "saved_user_id");
