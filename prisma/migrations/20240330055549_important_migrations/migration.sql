-- CreateTable
CREATE TABLE "Joinrequest" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Joinrequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Joinrequest_postId_key" ON "Joinrequest"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Joinrequest_userEmail_key" ON "Joinrequest"("userEmail");

-- AddForeignKey
ALTER TABLE "Joinrequest" ADD CONSTRAINT "Joinrequest_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Joinrequest" ADD CONSTRAINT "Joinrequest_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
