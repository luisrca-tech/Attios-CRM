import { ContentSidebarCard } from './ContentSidebarCard';
import { ContentSidebarHeader } from './ContentSidebarHeader';
import { ContentSidebarRoot } from './ContentSidebarRoot';
import { DinamycGraph } from './Graph/DinamycGraph';
import { MetricContainer } from './Graph/MetricContainer';
import { Metric } from './Graph/Metrics';
import { DashboardWithSidebar } from './pages/Dashboard';
import { ProductWithContentSidebar } from './pages/Product';
import ProductsWithSidebar from './pages/Products';
import { ProjectsWithSidebar } from './pages/Projects';

export const ContentSidebar = {
	Root: ContentSidebarRoot,
	Header: ContentSidebarHeader,
	Card: ContentSidebarCard,
	Graph: {
		Dinamyc: DinamycGraph,
		MetricContainer: MetricContainer,
		Metric: Metric
	},
	Page: {
		Projects: ProjectsWithSidebar,
		Dashboard: DashboardWithSidebar,
		Products: ProductsWithSidebar,
		Product: ProductWithContentSidebar
	}
};
