-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Blog" (
    "BlogID" TEXT NOT NULL,
    "Heading" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "AuthorID" TEXT NOT NULL,
    "Created" TIMESTAMP(3),

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("BlogID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "CommentID" TEXT NOT NULL,
    "BlogID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "AuthorID" TEXT NOT NULL,
    "Created" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("CommentID")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_BlogID_fkey" FOREIGN KEY ("BlogID") REFERENCES "Blog"("BlogID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
