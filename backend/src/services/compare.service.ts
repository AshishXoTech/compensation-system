import prisma from "../db/prisma";

function percentile(
  arr: number[],
  p: number
) {

  if (arr.length === 0) {
    return 0;
  }

  const index =
    Math.ceil((p / 100) * arr.length) - 1;

  return arr[
    Math.max(0, Math.min(index, arr.length - 1))
  ];
}

async function getCompanyLevelStats(
  companyName: string,
  level: string
) {

  const normalizedCompany =
    companyName
      .trim()
      .toLowerCase();

  const normalizedLevel =
    level
      .trim()
      .toUpperCase();

  const company =
    await prisma.company.findUnique({
      where: {
        name: normalizedCompany,
      },
    });

  if (!company) {
    throw new Error(
      `Company not found: ${companyName}`
    );
  }

  const salaries =
    await prisma.salary.findMany({

      where: {
        companyId: company.id,
        level: normalizedLevel as any,
      },

      orderBy: {
        totalCompensation: "asc",
      },
    });

  if (salaries.length === 0) {
    throw new Error(
      `No salaries found for ${companyName} ${level}`
    );
  }

  const compensations =
    salaries.map(
      (salary) => salary.totalCompensation
    );

  const total =
    compensations.reduce(
      (sum, value) => sum + value,
      0
    );

  return {

    company: company.name,

    level: normalizedLevel,

    totalEntries: compensations.length,

    averageCompensation:
      Math.round(
        total / compensations.length
      ),

    p50:
      percentile(compensations, 50),

    p75:
      percentile(compensations, 75),

    p90:
      percentile(compensations, 90),

    minCompensation:
      Math.min(...compensations),

    maxCompensation:
      Math.max(...compensations),
  };
}

export async function compareCompanies(
  query: any
) {

  const {
    company1,
    level1,
    company2,
    level2,
  } = query;

  if (
    !company1 ||
    !level1 ||
    !company2 ||
    !level2
  ) {
    throw new Error(
      "Missing comparison parameters"
    );
  }

  const firstCompany =
    await getCompanyLevelStats(
      String(company1),
      String(level1)
    );

  const secondCompany =
    await getCompanyLevelStats(
      String(company2),
      String(level2)
    );

  return {
    comparison: [
      firstCompany,
      secondCompany,
    ],
  };
}

export async function compareSalaryByIds(
  salaryId1: string,
  salaryId2: string
) {

  const salary1 =
    await prisma.salary.findUnique({
      where: {
        id: salaryId1,
      },
    });

  const salary2 =
    await prisma.salary.findUnique({
      where: {
        id: salaryId2,
      },
    });

  if (!salary1 || !salary2) {
    throw new Error(
      "One or both salary records not found"
    );
  }

  return {

    salary1: {
      id: salary1.id,
      baseSalary: salary1.baseSalary,
      bonus: salary1.bonus,
      stock: salary1.stock,
      totalCompensation:
        salary1.totalCompensation,
      level: salary1.level,
    },

    salary2: {
      id: salary2.id,
      baseSalary: salary2.baseSalary,
      bonus: salary2.bonus,
      stock: salary2.stock,
      totalCompensation:
        salary2.totalCompensation,
      level: salary2.level,
    },

    differences: {

      baseSalaryDifference:
        salary1.baseSalary -
        salary2.baseSalary,

      bonusDifference:
        salary1.bonus -
        salary2.bonus,

      stockDifference:
        salary1.stock -
        salary2.stock,

      totalCompensationDifference:
        salary1.totalCompensation -
        salary2.totalCompensation,

      levelDifference:
        `${salary1.level} vs ${salary2.level}`,
    },
  };
}
