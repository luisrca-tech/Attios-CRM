import { ArrowDown } from './ArrowDown';
import { ClosePadlockIcon } from './ClosePadlock';
import { ContactsIcon } from './Contacts';
import { EmailIcon } from './Email';
import { ErrorIcon } from './ErrorIcon';
import { FacebookIcon } from './Facebook';
import { FileBrowserIcon } from './FileBrowser';
import { GoogleIcon } from './Google';
import { HelpCenterIcon } from './HelpCenter';
import { InvoicesIcon } from './Invoices';
import { KanbanIcon } from './Kanban';
import { MessagesIcon } from './Messages';
import { NotificationsIcon } from './Notifications';
import { OpenPadlockIcon } from './OpenPadlock';
import { ProductsIcon } from './Products';
import { ProjectsIcon } from './Projects';
import { ReportsIcon } from './Reports';
import { TasksIcon } from './Tasks';
import { TwitterIcon } from './Twitter';
import { UserIcon } from './UserIcon';
import { MenuIcon } from './Menu';
import { DashboardIcon } from './Dashboard';
import { CalendarIcon } from './Calendar';
import { SearchIcon } from './Search';
import { AddButtonIcon } from './AddButton';

export const Icon = {
	Email: EmailIcon,
	User: UserIcon,
	Error: ErrorIcon,
	Menu: MenuIcon,
	Search: SearchIcon,
	AddButton: AddButtonIcon,
	Padlock: {
		Open: OpenPadlockIcon,
		Close: ClosePadlockIcon
	},
	Arrow: {
		Down: ArrowDown
	},
	Social: {
		Google: GoogleIcon,
		Facebook: FacebookIcon,
		Twitter: TwitterIcon
	},
	Sidebar: {
		Dashboard: DashboardIcon,
		Products: ProductsIcon,
		FileBrowser: FileBrowserIcon,
		Kanban: KanbanIcon,
		Notifications: NotificationsIcon,
		Calendar: CalendarIcon,
		Contacts: ContactsIcon,
		Projects: ProjectsIcon,
		Reports: ReportsIcon,
		Tasks: TasksIcon,
		Messages: MessagesIcon,
		HelpCenter: HelpCenterIcon,
		Invoices: InvoicesIcon
	}
};
