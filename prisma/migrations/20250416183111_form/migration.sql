-- CreateEnum
CREATE TYPE "PeopleGender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "forms" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "PeopleGender" NOT NULL,
    "favorite_time" JSONB[],
    "address" JSONB,
    "about" TEXT,
    "institute" TEXT,
    "course" INTEGER,
    "direction" TEXT,
    "profession" TEXT,
    "blocked_at" TIMESTAMP(3),

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forms_user_id_key" ON "forms"("user_id");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
