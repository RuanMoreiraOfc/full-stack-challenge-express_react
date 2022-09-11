-- CreateTable
CREATE TABLE "users_words" (
    "user_id" TEXT NOT NULL,
    "word_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL,
    "favorite" BOOLEAN NOT NULL,

    CONSTRAINT "users_words_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_words" ADD CONSTRAINT "users_words_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_words" ADD CONSTRAINT "users_words_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
