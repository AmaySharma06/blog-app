/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AuthorID` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `BlogID` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Created` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Heading` on the `Blog` table. All the data in the column will be lost.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AuthorID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `BlogID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `CommentID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `Created` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IsAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorID` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - The required column `blogID` was added to the `Blog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `content` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heading` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogID` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - The required column `commentID` was added to the `Comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userID` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_AuthorID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_AuthorID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_BlogID_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "AuthorID",
DROP COLUMN "BlogID",
DROP COLUMN "Content",
DROP COLUMN "Created",
DROP COLUMN "Heading",
ADD COLUMN     "authorID" TEXT NOT NULL,
ADD COLUMN     "blogID" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3),
ADD COLUMN     "heading" TEXT NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("blogID");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "AuthorID",
DROP COLUMN "BlogID",
DROP COLUMN "CommentID",
DROP COLUMN "Content",
DROP COLUMN "Created",
ADD COLUMN     "authorID" TEXT NOT NULL,
ADD COLUMN     "blogID" TEXT NOT NULL,
ADD COLUMN     "commentID" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3),
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentID");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "IsAdmin",
DROP COLUMN "Password",
DROP COLUMN "UserID",
DROP COLUMN "Username",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogID_fkey" FOREIGN KEY ("blogID") REFERENCES "Blog"("blogID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
