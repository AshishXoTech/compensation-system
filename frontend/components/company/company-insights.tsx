import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";
import type { CompanyInsights } from "@/types";
import { Wallet, Gift, TrendingUp, DollarSign } from "lucide-react";

interface CompanyInsightsCardsProps {
  data: CompanyInsights;
}

export function CompanyInsightsCards({ data }: CompanyInsightsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Avg Base Salary"
        value={formatCurrency(data.averageBaseSalary)}
        icon={Wallet}
        description="Base salary average"
      />
      <StatCard
        title="Avg Bonus"
        value={formatCurrency(data.averageBonus)}
        icon={Gift}
        description="Annual bonus average"
      />
      <StatCard
        title="Avg Stock"
        value={formatCurrency(data.averageStock)}
        icon={TrendingUp}
        description="Stock/RSU average"
      />
      <StatCard
        title="Avg Total Comp"
        value={formatCurrency(data.averageTotalCompensation)}
        icon={DollarSign}
        description="All-in compensation"
      />
    </div>
  );
}
