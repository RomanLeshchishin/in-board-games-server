-- CreateEnum
CREATE TYPE "ModelType" AS ENUM ('USER', 'AVATAR', 'FORM', 'COMMUNITY', 'EVENT', 'CHAT', 'MESSAGE', 'FEEDBACK');

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "model_id" UUID NOT NULL,
    "model_type" "ModelType" NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_link" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
