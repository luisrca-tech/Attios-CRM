import { NewProductModal } from "~/features/Products/NewProductModal";
import { Icon } from "../components/ui/Icons/_index";

interface AddActionItem {
  label: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  renderModal?: () => React.ReactNode;
}

export const addActionItems: AddActionItem[] = [
  {
    label: 'New Product',
    icon: <Icon.Sidebar.Products className="h-[1.125rem] w-[1.125rem] invert" />,
    isComingSoon: false,
    renderModal: () => <NewProductModal />
  },
  {
    label: 'New Project',
    icon: <Icon.Sidebar.Projects className="h-[1.125rem] w-[1.125rem]" />,
    isComingSoon: true
  },
  {
    label: 'New Task',
    icon: <Icon.Sidebar.Tasks className="h-[1.125rem] w-[1.125rem]" />,
    isComingSoon: true
  },
  {
    label: 'New Contact',
    icon: <Icon.Sidebar.Contacts className="h-[1.125rem] w-[1.125rem]" />,
    isComingSoon: true
  },
  {
    label: 'New Event',
    icon: <Icon.Sidebar.Calendar className="h-[1.125rem] w-[1.125rem]" />,
    isComingSoon: true
  },
  {
    label: 'New Invoice',
    icon: <Icon.Sidebar.Invoices className="h-[1.125rem] w-[1.125rem]" />,
    isComingSoon: true
  }
]
