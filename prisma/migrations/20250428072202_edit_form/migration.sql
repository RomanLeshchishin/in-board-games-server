-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_user_id_fkey";

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
