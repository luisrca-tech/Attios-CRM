import { AddActionMenu } from "~/common/components/ui/AddActionMenu";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { ContentSidebar } from "~/features/ContentSidebar";
import { DashboardMetrics } from "~/features/Dashboard/components/DashboardMetrics";

export default function Dashboard() {
  return (
    <div className="flex h-full w-full">
      <ContentSidebar.Page.Dashboard />
      <div className="flex w-full flex-col gap-[0.875rem] bg-white-400">
        <PagesHeader
          iconLeft={<Icon.Search className="h-4 w-4" />}
          title="Dashboard"
        >
          <AddActionMenu />
        </PagesHeader>
        <DashboardMetrics />
      </div>
    </div>
  );
}
