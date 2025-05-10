/*
  Warnings:

  - You are about to drop the column `about` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `patronymic` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" DROP COLUMN "about",
DROP COLUMN "age",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "patronymic" TEXT,
ADD COLUMN     "phone_number" BIGINT;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "birthday",
DROP COLUMN "patronymic",
DROP COLUMN "phone_number",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "age" INTEGER NOT NULL;
