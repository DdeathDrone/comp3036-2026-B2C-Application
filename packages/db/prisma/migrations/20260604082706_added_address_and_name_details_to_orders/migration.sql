/*
  Warnings:

  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientFirstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientSurname` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "recipientFirstName" TEXT NOT NULL,
ADD COLUMN     "recipientSurname" TEXT NOT NULL;
