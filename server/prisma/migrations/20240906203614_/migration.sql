/*
  Warnings:

  - You are about to drop the column `address` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "address",
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "healthPlan" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "profession" TEXT,
ADD COLUMN     "responsible_name" TEXT,
ADD COLUMN     "responsible_phone" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");
