/*
  Warnings:

  - The values [USER,MANAGER] on the enum `ModelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelType_new" AS ENUM ('AVATAR', 'FORM', 'COMMUNITY', 'EVENT', 'CHAT', 'MESSAGE', 'FEEDBACK');
ALTER TABLE "files" ALTER COLUMN "model_type" TYPE "ModelType_new" USING ("model_type"::text::"ModelType_new");
ALTER TYPE "ModelType" RENAME TO "ModelType_old";
ALTER TYPE "ModelType_new" RENAME TO "ModelType";
DROP TYPE "ModelType_old";
COMMIT;
