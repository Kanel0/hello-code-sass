/*
  Warnings:

  - You are about to drop the column `username` on the `user_admin` table. All the data in the column will be lost.
  - Added the required column `Username` to the `user_admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_admin` DROP COLUMN `username`,
    ADD COLUMN `Username` VARCHAR(191) NOT NULL;
