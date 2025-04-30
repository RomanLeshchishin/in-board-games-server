/*
  Warnings:

  - You are about to drop the `forms-games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forms-interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forms-topics` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `model_type` on the `files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FileModelType" AS ENUM ('AVATAR', 'FORM', 'COMMUNITY', 'EVENT', 'CHAT', 'MESSAGE', 'FEEDBACK');

-- CreateEnum
CREATE TYPE "FormModelType" AS ENUM ('INTEREST', 'TOPIC', 'GAME', 'COMMUNITIES');

-- DropForeignKey
ALTER TABLE "forms-games" DROP CONSTRAINT "forms-games_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "forms-games" DROP CONSTRAINT "forms-games_user_id_fkey";

-- DropForeignKey
ALTER TABLE "forms-interests" DROP CONSTRAINT "forms-interests_interest_id_fkey";

-- DropForeignKey
ALTER TABLE "forms-interests" DROP CONSTRAINT "forms-interests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "forms-topics" DROP CONSTRAINT "forms-topics_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "forms-topics" DROP CONSTRAINT "forms-topics_user_id_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "model_type",
ADD COLUMN     "model_type" "FileModelType" NOT NULL;

-- DropTable
DROP TABLE "forms-games";

-- DropTable
DROP TABLE "forms-interests";

-- DropTable
DROP TABLE "forms-topics";

-- DropEnum
DROP TYPE "ModelType";

-- CreateTable
CREATE TABLE "forms-models" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "model_id" UUID NOT NULL,
    "model_type" "FormModelType" NOT NULL,

    CONSTRAINT "forms-models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forms-models_user_id_model_id_model_type_key" ON "forms-models"("user_id", "model_id", "model_type");

-- AddForeignKey
ALTER TABLE "forms-models" ADD CONSTRAINT "forms-models_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "forms"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
