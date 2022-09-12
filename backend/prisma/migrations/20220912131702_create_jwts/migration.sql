-- CreateTable
CREATE TABLE "jwts" (
    "user_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jwts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jwts_user_id_key" ON "jwts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "jwts_value_key" ON "jwts"("value");

-- AddForeignKey
ALTER TABLE "jwts" ADD CONSTRAINT "jwts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
