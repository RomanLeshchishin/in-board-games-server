-- DropIndex
DROP INDEX "profiles-people_saved_user_id_key";

-- DropIndex
DROP INDEX "profiles-people_user_id_key";

-- AddForeignKey
ALTER TABLE "profiles-people" ADD CONSTRAINT "profiles-people_saved_user_id_fkey" FOREIGN KEY ("saved_user_id") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
