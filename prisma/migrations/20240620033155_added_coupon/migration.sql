/*
  Warnings:

  - A unique constraint covering the columns `[couponId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `couponId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CouponStatus" AS ENUM ('Fresh', 'Handed', 'Used');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "couponId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Coupon" (
    "couponId" SERIAL NOT NULL,
    "status" "CouponStatus" NOT NULL,
    "discountPct" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("couponId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_couponId_key" ON "Order"("couponId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("couponId") ON DELETE RESTRICT ON UPDATE CASCADE;
