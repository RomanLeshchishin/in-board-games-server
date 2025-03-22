/*
  Warnings:

  - You are about to drop the column `files` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `friends` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `saved_people` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `selected_events` on the `profiles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PeopleStatus" AS ENUM ('SAVED', 'FRIEND');

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "files",
DROP COLUMN "friends",
DROP COLUMN "saved_people",
DROP COLUMN "selected_events";

-- CreateTable
CREATE TABLE "profiles-people" (
    "id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "saved_profile_id" UUID NOT NULL,
    "status" "PeopleStatus" NOT NULL,

    CONSTRAINT "profiles-people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles-people_profile_id_key" ON "profiles-people"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles-people_saved_profile_id_key" ON "profiles-people"("saved_profile_id");

-- AddForeignKey
ALTER TABLE "profiles-people" ADD CONSTRAINT "profiles-people_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
