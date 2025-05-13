/*
  Warnings:

  - The values [COMMUNITIES] on the enum `FormModelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FormModelType_new" AS ENUM ('INTEREST', 'TOPIC', 'GAME', 'COMMUNITY');
ALTER TABLE "forms-models" ALTER COLUMN "model_type" TYPE "FormModelType_new" USING ("model_type"::text::"FormModelType_new");
ALTER TYPE "FormModelType" RENAME TO "FormModelType_old";
ALTER TYPE "FormModelType_new" RENAME TO "FormModelType";
DROP TYPE "FormModelType_old";
COMMIT;
