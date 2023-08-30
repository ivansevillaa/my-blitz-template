/*
  Warnings:

  - You are about to drop the column `emailVeriafiedAy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVeriafiedAy",
ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3);
