/*
  Warnings:

  - Added the required column `how_often` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `what_days` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HowOften" AS ENUM ('TWICE_A_WEEK', 'WEEKLY', 'TWICE_A_MONTH', 'MONTHLY');

-- CreateEnum
CREATE TYPE "WhatDays" AS ENUM ('WORKING', 'WEEKENDS', 'WORKING_WEEKENDS');

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "how_often" "HowOften" NOT NULL,
ADD COLUMN     "what_days" "WhatDays" NOT NULL;
