-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "forwarded_message_id" INTEGER,
ALTER COLUMN "text" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_forwarded_message_id_fkey" FOREIGN KEY ("forwarded_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
