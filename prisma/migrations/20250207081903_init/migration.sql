/*
  Warnings:

  - You are about to drop the column `role` on the `user_admin` table. All the data in the column will be lost.
  - Added the required column `password` to the `user_admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_admin` DROP COLUMN `role`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
