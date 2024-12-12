import { Icon } from "../components/ui/Icons/_index";
import { NewProductModal } from "../components/modals/NewProductModal";

interface AddActionItem {
  label: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  modal?: React.ComponentType;
}

export const addActionItems: AddActionItem[] = [
  {
    label: 'New Product',
    icon: <Icon.Sidebar.Products className="h-[1.125rem] w-[1.125rem] invert" />,
    isComingSoon: false,
    modal: NewProductModal
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
