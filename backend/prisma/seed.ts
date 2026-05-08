import { Level, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LevelKey = keyof typeof Level;

type Compensation = {
    baseSalary: number;
    bonus: number;
    stock: number;
};

type CompanySeed = {
    name: string;
    primaryLocation: string;
    globalLocation: string;
    indiaTotals: Record<LevelKey, number>;
    globalTotals: Record<LevelKey, number>;
};

const levels: LevelKey[] = ["L3", "L4", "L5", "L6", "L7"];

const levelProfiles: Record<
    LevelKey,
    { role: string; experienceYears: number; confidenceScore: number }
> = {
    L3: {
        role: "Software Engineer",
        experienceYears: 2,
        confidenceScore: 94,
    },
    L4: {
        role: "Software Engineer II",
        experienceYears: 4,
        confidenceScore: 96,
    },
    L5: {
        role: "Senior Software Engineer",
        experienceYears: 7,
        confidenceScore: 95,
    },
    L6: {
        role: "Staff Software Engineer",
        experienceYears: 11,
        confidenceScore: 91,
    },
    L7: {
        role: "Principal Software Engineer",
        experienceYears: 15,
        confidenceScore: 88,
    },
};

const companySeeds: CompanySeed[] = [
    {
        name: "google",
        primaryLocation: "Bangalore",
        globalLocation: "Mountain View",
        indiaTotals: {
            L3: 3_600_000,
            L4: 5_800_000,
            L5: 9_800_000,
            L6: 16_500_000,
            L7: 27_500_000,
        },
        globalTotals: {
            L3: 17_500_000,
            L4: 25_500_000,
            L5: 38_500_000,
            L6: 57_500_000,
            L7: 82_000_000,
        },
    },
    {
        name: "amazon",
        primaryLocation: "Hyderabad",
        globalLocation: "Seattle",
        indiaTotals: {
            L3: 2_900_000,
            L4: 4_800_000,
            L5: 8_400_000,
            L6: 14_200_000,
            L7: 24_000_000,
        },
        globalTotals: {
            L3: 15_800_000,
            L4: 23_500_000,
            L5: 35_000_000,
            L6: 53_000_000,
            L7: 76_000_000,
        },
    },
    {
        name: "microsoft",
        primaryLocation: "Hyderabad",
        globalLocation: "Seattle",
        indiaTotals: {
            L3: 3_200_000,
            L4: 5_100_000,
            L5: 8_900_000,
            L6: 15_200_000,
            L7: 25_500_000,
        },
        globalTotals: {
            L3: 16_500_000,
            L4: 24_500_000,
            L5: 36_500_000,
            L6: 55_000_000,
            L7: 79_000_000,
        },
    },
    {
        name: "uber",
        primaryLocation: "Bangalore",
        globalLocation: "Remote",
        indiaTotals: {
            L3: 3_400_000,
            L4: 5_600_000,
            L5: 9_400_000,
            L6: 16_000_000,
            L7: 26_000_000,
        },
        globalTotals: {
            L3: 14_800_000,
            L4: 22_500_000,
            L5: 34_500_000,
            L6: 51_000_000,
            L7: 72_000_000,
        },
    },
    {
        name: "atlassian",
        primaryLocation: "Bangalore",
        globalLocation: "Remote",
        indiaTotals: {
            L3: 3_100_000,
            L4: 5_000_000,
            L5: 8_700_000,
            L6: 14_800_000,
            L7: 24_500_000,
        },
        globalTotals: {
            L3: 14_200_000,
            L4: 21_500_000,
            L5: 32_500_000,
            L6: 48_500_000,
            L7: 69_000_000,
        },
    },
    {
        name: "flipkart",
        primaryLocation: "Bangalore",
        globalLocation: "Pune",
        indiaTotals: {
            L3: 2_500_000,
            L4: 4_100_000,
            L5: 7_200_000,
            L6: 12_500_000,
            L7: 20_500_000,
        },
        globalTotals: {
            L3: 2_300_000,
            L4: 3_900_000,
            L5: 6_800_000,
            L6: 11_800_000,
            L7: 19_500_000,
        },
    },
    {
        name: "swiggy",
        primaryLocation: "Gurgaon",
        globalLocation: "Mumbai",
        indiaTotals: {
            L3: 2_200_000,
            L4: 3_600_000,
            L5: 6_300_000,
            L6: 10_800_000,
            L7: 18_000_000,
        },
        globalTotals: {
            L3: 2_100_000,
            L4: 3_400_000,
            L5: 5_900_000,
            L6: 10_200_000,
            L7: 17_200_000,
        },
    },
    {
        name: "zomato",
        primaryLocation: "Gurgaon",
        globalLocation: "Mumbai",
        indiaTotals: {
            L3: 2_250_000,
            L4: 3_700_000,
            L5: 6_500_000,
            L6: 11_200_000,
            L7: 18_500_000,
        },
        globalTotals: {
            L3: 2_150_000,
            L4: 3_500_000,
            L5: 6_100_000,
            L6: 10_600_000,
            L7: 17_800_000,
        },
    },
];

function splitCompensation(totalCompensation: number, level: LevelKey): Compensation {
    const equityRatioByLevel: Record<LevelKey, number> = {
        L3: 0.16,
        L4: 0.22,
        L5: 0.29,
        L6: 0.36,
        L7: 0.43,
    };

    const bonusRatioByLevel: Record<LevelKey, number> = {
        L3: 0.08,
        L4: 0.1,
        L5: 0.12,
        L6: 0.14,
        L7: 0.16,
    };

    const stock = Math.round(
        (totalCompensation * equityRatioByLevel[level]) / 1_000
    ) * 1_000;
    const bonus = Math.round(
        (totalCompensation * bonusRatioByLevel[level]) / 1_000
    ) * 1_000;
    const baseSalary = totalCompensation - bonus - stock;

    return {
        baseSalary,
        bonus,
        stock,
    };
}

async function main() {
    console.log("Starting Compensation Intelligence seed");

    await prisma.salary.deleteMany();
    await prisma.company.deleteMany();

    await prisma.company.createMany({
        data: companySeeds.map((company) => ({
            name: company.name,
        })),
    });

    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    const companyIdByName = new Map(
        companies.map((company) => [company.name, company.id])
    );

    const salaryRows = companySeeds.flatMap((company, companyIndex) => {
        const companyId = companyIdByName.get(company.name);

        if (!companyId) {
            throw new Error(`Missing company after insert: ${company.name}`);
        }

        return [
            ...levels.map((level, levelIndex) => {
                const profile = levelProfiles[level];
                const compensation = splitCompensation(company.indiaTotals[level], level);

                return {
                    companyId,
                    role: profile.role,
                    level: Level[level],
                    location: company.primaryLocation,
                    experienceYears:
                        profile.experienceYears + ((companyIndex + levelIndex) % 3) * 0.5,
                    ...compensation,
                    totalCompensation:
                        compensation.baseSalary + compensation.bonus + compensation.stock,
                    confidenceScore: profile.confidenceScore - (companyIndex % 4),
                };
            }),
            ...levels.map((level, levelIndex) => {
                const profile = levelProfiles[level];
                const compensation = splitCompensation(company.globalTotals[level], level);

                return {
                    companyId,
                    role: profile.role,
                    level: Level[level],
                    location: company.globalLocation,
                    experienceYears:
                        profile.experienceYears + 0.5 + ((companyIndex + levelIndex) % 4) * 0.5,
                    ...compensation,
                    totalCompensation:
                        compensation.baseSalary + compensation.bonus + compensation.stock,
                    confidenceScore: profile.confidenceScore - ((companyIndex + 1) % 5),
                };
            }),
        ];
    });

    await prisma.salary.createMany({
        data: salaryRows,
    });

    console.log(`Companies inserted: ${companies.length}`);
    console.log(`Salary entries inserted: ${salaryRows.length}`);
    console.log("Seed completed successfully");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
