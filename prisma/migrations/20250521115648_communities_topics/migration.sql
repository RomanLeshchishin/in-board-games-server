-- CreateTable
CREATE TABLE "communities-topics" (
    "id" UUID NOT NULL,
    "community_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "communities-topics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "communities-topics_community_id_topic_id_key" ON "communities-topics"("community_id", "topic_id");

-- AddForeignKey
ALTER TABLE "communities-topics" ADD CONSTRAINT "communities-topics_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities-topics" ADD CONSTRAINT "communities-topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
