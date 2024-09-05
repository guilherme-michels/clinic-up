/*
  Warnings:

  - You are about to drop the column `anamnesis_id` on the `anamnesis_answers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `anamnesis_answers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `anamnesis_answers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `anamnesis_questions` table. All the data in the column will be lost.
  - You are about to drop the column `isRequired` on the `anamnesis_questions` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `anamnesis_questions` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `anamnesis_questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `anamnesis_questions` table. All the data in the column will be lost.
  - Added the required column `patient_anamnesis_id` to the `anamnesis_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anamnesis_answers" DROP CONSTRAINT "anamnesis_answers_anamnesis_id_fkey";

-- AlterTable
ALTER TABLE "anamnesis_answers" DROP COLUMN "anamnesis_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "anamnesisId" TEXT,
ADD COLUMN     "patient_anamnesis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "anamnesis_questions" DROP COLUMN "created_at",
DROP COLUMN "isRequired",
DROP COLUMN "options",
DROP COLUMN "order",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "financial_transactions" ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "patient_anamneses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "patient_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,

    CONSTRAINT "patient_anamneses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "patient_anamneses" ADD CONSTRAINT "patient_anamneses_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_anamneses" ADD CONSTRAINT "patient_anamneses_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "anamnesis_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamnesis_answers" ADD CONSTRAINT "anamnesis_answers_patient_anamnesis_id_fkey" FOREIGN KEY ("patient_anamnesis_id") REFERENCES "patient_anamneses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamnesis_answers" ADD CONSTRAINT "anamnesis_answers_anamnesisId_fkey" FOREIGN KEY ("anamnesisId") REFERENCES "anamneses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
