import prisma from "../db/prisma";

interface CreateSalaryInput {
  company: string;
  role: string;
  level: "L3" | "L4" | "L5" | "L6" | "L7";
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus?: number;
  stock?: number;
}

interface GetSalariesQuery {
  company?: string;
  role?: string;
  level?: string;
  location?: string;

  minComp?: string;
  maxComp?: string;

  minExperience?: string;
  maxExperience?: string;

  sortBy?: string;
  order?: string;

  page?: string;
  limit?: string;
}

export async function createSalary(
  data: CreateSalaryInput
) {

  const normalizedCompany =
    data.company
      .trim()
      .toLowerCase();

  // Find existing company
  let company =
    await prisma.company.findFirst({
      where: {
        name: normalizedCompany,
      },
    });

  // Create if not exists
  if (!company) {

    company =
      await prisma.company.create({
        data: {
          name: normalizedCompany,
        },
      });
  }

  const bonus =
    data.bonus || 0;

  const stock =
    data.stock || 0;

  // Check for duplicate salary entry
  const existingSalary = await prisma.salary.findFirst({
    where: {
      companyId: company.id,
      role: data.role,
      level: data.level,
      location: data.location,
      experienceYears: data.experienceYears,
      baseSalary: data.baseSalary,
      bonus,
      stock,
    },
  });

  if (existingSalary) {
    const error: any = new Error("Duplicate salary entry already exists");
    error.status = 409;
    throw error;
  }

  const totalCompensation =
    data.baseSalary +
    bonus +
    stock;

  return prisma.salary.create({

    data: {

      companyId:
        company.id,

      role:
        data.role,

      level:
        data.level,

      location:
        data.location,

      experienceYears:
        data.experienceYears,

      baseSalary:
        data.baseSalary,

      bonus,

      stock,

      totalCompensation,

      confidenceScore: 0,
    },

    include: {
      company: true,
    },
  });
}

export async function getSalaries(
  query: GetSalariesQuery
) {

  const {

    company,
    level,
    location,

    minComp,
    maxComp,

    minExperience,
    maxExperience,

    sortBy = "createdAt",
    order = "desc",

    page = "1",
    limit = "10",

  } = query;

  const currentPage =
    Number(page);

  const perPage =
    Number(limit);

  const skip =
    (currentPage - 1) *
    perPage;

  const where: any = {};

  // company filter
  if (company) {

    where.company = {
      name: company
        .trim()
        .toLowerCase(),
    };
  }

  // role filter
  if (query.role) {

    where.role = {
      contains: query.role,
      mode: "insensitive",
    };
  }

  // level filter
  if (level) {

    where.level =
      level.toUpperCase();
  }

  // location filter
  if (location) {

    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  // compensation filter
  if (
    minComp ||
    maxComp
  ) {

    where.totalCompensation = {};

    if (minComp) {

      where.totalCompensation.gte =
        Number(minComp);
    }

    if (maxComp) {

      where.totalCompensation.lte =
        Number(maxComp);
    }
  }

  // experience filter
  if (
    minExperience ||
    maxExperience
  ) {

    where.experienceYears = {};

    if (minExperience) {

      where.experienceYears.gte =
        Number(minExperience);
    }

    if (maxExperience) {

      where.experienceYears.lte =
        Number(maxExperience);
    }
  }

  // allowed sorting fields
  const allowedSortFields = [
    "createdAt",
    "baseSalary",
    "bonus",
    "stock",
    "totalCompensation",
    "experienceYears",
  ];

  const safeSortBy =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

  const safeOrder =
    order === "asc"
      ? "asc"
      : "desc";

  const salaries =
    await prisma.salary.findMany({

      where,

      include: {
        company: true,
      },

      orderBy: {
        [safeSortBy]:
          safeOrder,
      },

      skip,

      take: perPage,
    });

  const totalResults =
    await prisma.salary.count({
      where,
    });

  return {

    pagination: {

      totalResults,

      currentPage,

      perPage,

      totalPages:
        Math.ceil(
          totalResults /
          perPage
        ),
    },

    data: salaries,
  };
}