/*
  Warnings:

  - You are about to drop the column `spotifyUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyUsername` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.spotifyUsername_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "spotifyUrl",
DROP COLUMN "spotifyUsername",
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
