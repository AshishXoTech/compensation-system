import prisma from "../db/prisma";

export async function getDashboardOverview() {

  const totalSalaries =
    await prisma.salary.count();

  const totalCompanies =
    await prisma.company.count();

  const salaries =
    await prisma.salary.findMany({
      select: {
        totalCompensation: true,
      },
    });

  const compensations =
    salaries.map(
      (s) => s.totalCompensation
    );

  const averageCompensation =
    compensations.length > 0
      ? Math.round(
          compensations.reduce(
            (sum, val) => sum + val,
            0
          ) / compensations.length
        )
      : 0;

  const highestCompensation =
    compensations.length > 0
      ? Math.max(...compensations)
      : 0;

  return {

    totalSalaries,

    totalCompanies,

    averageCompensation,

    highestCompensation,
  };
}

export async function getTopCompanies() {

  const companies =
    await prisma.salary.groupBy({

      by: ["companyId"],

      _avg: {
        totalCompensation: true,
      },

      _count: {
        id: true,
      },

      orderBy: {
        _avg: {
          totalCompensation: "desc",
        },
      },

      take: 10,
    });

  const result =
    await Promise.all(

      companies.map(
        async (company) => {

          const companyData =
            await prisma.company.findUnique({
              where: {
                id: company.companyId,
              },
            });

          return {

            company:
              companyData?.name,

            averageCompensation:
              Math.round(
                company._avg
                  .totalCompensation || 0
              ),

            totalEntries:
              company._count.id,
          };
        }
      )
    );

  return result;
}

export async function getLevelDistribution() {

  const distribution =
    await prisma.salary.groupBy({

      by: ["level"],

      _count: {
        id: true,
      },

      orderBy: {
        level: "asc",
      },
    });

  return distribution.map(
    (item) => ({
      level: item.level,
      count: item._count.id,
    })
  );
}

export async function getLocationInsights() {

  const locations =
    await prisma.salary.groupBy({

      by: ["location"],

      _avg: {
        totalCompensation: true,
      },

      _count: {
        id: true,
      },

      orderBy: {
        _avg: {
          totalCompensation: "desc",
        },
      },
    });

  return locations.map(
    (item) => ({

      location:
        item.location,

      averageCompensation:
        Math.round(
          item._avg
            .totalCompensation || 0
        ),

      entries:
        item._count.id,
    })
  );
}