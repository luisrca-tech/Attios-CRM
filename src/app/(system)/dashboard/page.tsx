import { AddActionMenu } from "~/common/components/ui/AddActionMenu";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { ContentSidebar } from "~/features/ContentSidebar";
import { DashboardMetrics } from "~/features/Dashboard/components/DashboardMetrics";
import { DashboardTable } from "~/features/Dashboard/DashboardTable";

export default function Dashboard() {
  return (
    <main className="flex h-screen w-full">
      <ContentSidebar.Page.Dashboard />
      <div className="flex w-full flex-col gap-[0.875rem] bg-white-300 lg:pl-7">
        <PagesHeader
          iconLeft={<Icon.Search className="h-4 w-4" />}
          title="Dashboard"
        >
          <AddActionMenu />
        </PagesHeader>
        <div className="flex flex-col gap-[1.125rem] bg-white-300 px-4 lg:gap-7 lg:rounded-xl">
          <DashboardMetrics />
          <DashboardTable />
        </div>
      </div>
    </main>
  );
}
