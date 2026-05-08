-- CreateEnum
CREATE TYPE "Level" AS ENUM ('L3', 'L4', 'L5', 'L6', 'L7');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "location" TEXT NOT NULL,
    "experienceYears" DOUBLE PRECISION NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCompensation" DOUBLE PRECISION NOT NULL,
    "confidenceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Salary_companyId_idx" ON "Salary"("companyId");

-- CreateIndex
CREATE INDEX "Salary_level_idx" ON "Salary"("level");

-- CreateIndex
CREATE INDEX "Salary_location_idx" ON "Salary"("location");

-- CreateIndex
CREATE INDEX "Salary_experienceYears_idx" ON "Salary"("experienceYears");

-- CreateIndex
CREATE INDEX "Salary_totalCompensation_idx" ON "Salary"("totalCompensation");

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
