/*
  Warnings:

  - A unique constraint covering the columns `[user_id,topic_id]` on the table `forms-games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,interest_id]` on the table `forms-interests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,topic_id]` on the table `forms-topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "forms-games_user_id_topic_id_key" ON "forms-games"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "forms-interests_user_id_interest_id_key" ON "forms-interests"("user_id", "interest_id");

-- CreateIndex
CREATE UNIQUE INDEX "forms-topics_user_id_topic_id_key" ON "forms-topics"("user_id", "topic_id");
