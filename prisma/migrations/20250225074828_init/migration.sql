/*
  Warnings:

  - You are about to drop the column `user_name` on the `user_admin` table. All the data in the column will be lost.
  - Added the required column `username` to the `user_admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_admin` DROP COLUMN `user_name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
