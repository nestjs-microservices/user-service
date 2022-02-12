-- CreateTable
CREATE TABLE "UserCredential" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCredential" ADD CONSTRAINT "UserCredential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
