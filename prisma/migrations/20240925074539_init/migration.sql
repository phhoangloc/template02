/*
  Warnings:

  - You are about to drop the `Coffee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Coffee` DROP FOREIGN KEY `Coffee_coverId_fkey`;

-- DropForeignKey
ALTER TABLE `Coffee` DROP FOREIGN KEY `Coffee_hostId_fkey`;

-- DropTable
DROP TABLE `Coffee`;
