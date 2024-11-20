import { ContentSidebarCard } from './ContentSidebarCard';
import { ContentSidebarHeader } from './ContentSidebarHeader';
import { ContentSidebarRoot } from './ContentSidebarRoot';
import { DashboardWithSidebar } from './Dashboard';
import { DinamycGraph } from './DinamycGraph';
import { ProjectsWithSidebar } from './Projects';

export const ContentSidebar = {
	Root: ContentSidebarRoot,
	Header: ContentSidebarHeader,
	Card: ContentSidebarCard,
	Graph: DinamycGraph,
	Page: {
		Project: ProjectsWithSidebar,
		Dashboard: DashboardWithSidebar
	}
};
