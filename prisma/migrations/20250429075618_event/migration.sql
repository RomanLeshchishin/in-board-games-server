-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "community_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "blocked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_community_id_key" ON "events"("community_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
