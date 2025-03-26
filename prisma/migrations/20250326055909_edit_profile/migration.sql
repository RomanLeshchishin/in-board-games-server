/*
  Warnings:

  - You are about to drop the column `saved_events` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptions` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "saved_events",
DROP COLUMN "subscriptions";
