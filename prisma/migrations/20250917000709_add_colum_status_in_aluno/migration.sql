-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ativo', 'inativo');

-- AlterTable
ALTER TABLE "public"."Aluno" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ativo';
