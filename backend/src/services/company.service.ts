import prisma from "../db/prisma";

export async function getCompanyInsights(
  companyName: string
) {

  const normalizedCompany =
    companyName.trim().toLowerCase();

  // find company
  const company =
    await prisma.company.findUnique({
      where: {
        name: normalizedCompany,
      },
    });

  if (!company) {
    throw new Error("Company not found");
  }

  // all salaries
  const salaries =
    await prisma.salary.findMany({
      where: {
        companyId: company.id,
      },
    });

  const totalEntries = salaries.length;

  // aggregates
  const totalBase =
    salaries.reduce(
      (sum, s) => sum + s.baseSalary,
      0
    );

  const totalBonus =
    salaries.reduce(
      (sum, s) => sum + s.bonus,
      0
    );

  const totalStock =
    salaries.reduce(
      (sum, s) => sum + s.stock,
      0
    );

  const totalComp =
    salaries.reduce(
      (sum, s) =>
        sum + s.totalCompensation,
      0
    );

  // level grouping
  const levelMap: Record<
    string,
    {
      count: number;
      totalComp: number;
    }
  > = {};

  salaries.forEach((salary) => {

    if (!levelMap[salary.level]) {
      levelMap[salary.level] = {
        count: 0,
        totalComp: 0,
      };
    }

    levelMap[salary.level].count += 1;

    levelMap[salary.level].totalComp +=
      salary.totalCompensation;
  });

  const levels =
    Object.entries(levelMap).map(
      ([level, data]) => ({
        level,
        count: data.count,

        averageTotalCompensation:
          Math.round(
            data.totalComp / data.count
          ),
      })
    );

  return {

    company: company.name,

    totalEntries,

    averageBaseSalary:
      Math.round(totalBase / totalEntries),

    averageBonus:
      Math.round(totalBonus / totalEntries),

    averageStock:
      Math.round(totalStock / totalEntries),

    averageTotalCompensation:
      Math.round(totalComp / totalEntries),

    levels,
  };
}

export async function getCompanyAnalytics(
  companyName: string
) {

  const normalizedCompany =
    companyName.trim().toLowerCase();

  const company =
    await prisma.company.findUnique({
      where: {
        name: normalizedCompany,
      },
    });

  if (!company) {
    throw new Error("Company not found");
  }

  const salaries =
    await prisma.salary.findMany({
      where: {
        companyId: company.id,
      },
      orderBy: {
        totalCompensation: "asc",
      },
    });

  if (salaries.length === 0) {
    throw new Error("No salaries found");
  }

  const comps =
    salaries.map(
      (s) => s.totalCompensation
    );

  function percentile(
    arr: number[],
    p: number
  ) {

    const index =
      Math.ceil((p / 100) * arr.length) - 1;

    return arr[index];
  }

  const total =
    comps.reduce(
      (sum, val) => sum + val,
      0
    );

  return {

    company: company.name,

    entries: comps.length,

    p50: percentile(comps, 50),

    p75: percentile(comps, 75),

    p90: percentile(comps, 90),

    minComp: Math.min(...comps),

    maxComp: Math.max(...comps),

    averageComp:
      Math.round(total / comps.length),
  };
}