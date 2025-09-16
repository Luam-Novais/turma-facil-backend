-- CreateTable
CREATE TABLE "public"."Professor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Modalidade" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "profId" INTEGER NOT NULL,

    CONSTRAINT "Modalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aluno" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_AlunoToModalidade" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AlunoToModalidade_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modalidade_name_key" ON "public"."Modalidade"("name");

-- CreateIndex
CREATE INDEX "_AlunoToModalidade_B_index" ON "public"."_AlunoToModalidade"("B");

-- AddForeignKey
ALTER TABLE "public"."Modalidade" ADD CONSTRAINT "Modalidade_profId_fkey" FOREIGN KEY ("profId") REFERENCES "public"."Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AlunoToModalidade" ADD CONSTRAINT "_AlunoToModalidade_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AlunoToModalidade" ADD CONSTRAINT "_AlunoToModalidade_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Modalidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
