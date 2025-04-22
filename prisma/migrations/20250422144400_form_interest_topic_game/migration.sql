-- CreateTable
CREATE TABLE "forms-interests" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "interest_id" UUID NOT NULL,

    CONSTRAINT "forms-interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms-topics" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "forms-topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms-games" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,

    CONSTRAINT "forms-games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forms-interests" ADD CONSTRAINT "forms-interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "forms"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms-interests" ADD CONSTRAINT "forms-interests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms-topics" ADD CONSTRAINT "forms-topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "forms"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms-topics" ADD CONSTRAINT "forms-topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms-games" ADD CONSTRAINT "forms-games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "forms"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms-games" ADD CONSTRAINT "forms-games_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
