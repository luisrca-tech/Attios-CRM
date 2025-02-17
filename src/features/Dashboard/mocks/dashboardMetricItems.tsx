import type { DashboardMetric } from "../types/dashboardMetric.type";
import { Icon } from "~/common/components/ui/Icons/_index";

export const dashboardMetricItems: DashboardMetric[] = [
  {
    metric: "New sales",
    value: "1.345",
    icon: (
      <div className="flex items-center justify-center rounded-[0.625rem] bg-primary-100/10 p-4">
        <Icon.Graph.Statistics
          className="h-[1.125rem] w-[1.125rem]"
          fill="#5E81F4"
        />
      </div>
    ),
  },
  {
    metric: "New leads",
    value: "2.890",
    icon: (
      <div className="flex items-center justify-center rounded-[0.625rem] bg-secondary-300/20 p-4">
        <Icon.Lead className="h-[1.125rem] w-[1.125rem]" />
      </div>
    ),
  },
  {
    metric: "Income per lead",
    value: "$1.870",
    icon: (
      <div className="flex items-center justify-center rounded-[0.625rem] bg-white-400 p-4">
        <Icon.Wallet className="h-[1.125rem] w-[1.125rem]" />
      </div>
    ),
  },
  {
    metric: "Conversion rate",
    value: "5.10%",
    icon: (
      <div className="flex items-center justify-center rounded-[0.625rem] bg-secondary-300/20 p-4">
        <Icon.AquariusMetric className="h-[1.125rem] w-[1.125rem]" />
      </div>
    ),
  },
];
