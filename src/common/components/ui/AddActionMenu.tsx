"use client"

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { selectedAddAction } from "~/common/atoms/selected-add-action";
import { addActionItems } from "~/common/constants/addActionItems";
import { Button } from "./Button";
import { CommingSoon } from "./CommingSoon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Icon } from "./Icons/_index";
import { useIsDesktop } from "~/common/hooks/useMediaQuery";

export function AddActionMenu() { 
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useAtom(selectedAddAction);

  const handleItemClick = (item: typeof addActionItems[number]) => {
   if (item.isComingSoon) return;
    
   if (isDesktop && item.renderModal) {
    setSelectedModal(item.renderModal());
   }
   if (item.mobileHref) {
    router.push(item.mobileHref);
   }
  };

  if (selectedModal) {
    return selectedModal;
  }
  
  return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="bg-white-400 data-[state=open]:bg-primary-100/90">
          <Button className="p-3 hover:bg-white-200/60" color="secondary">
            <Icon.AddButton className="h-4 w-4" fill={isOpen ? "#FAFBFF" : "#8181A5"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white-100 mr-7 mt-2 lg:min-w-[17.8125rem]">
          {addActionItems.map((item) => (
            <DropdownMenuItem 
              onClick={() => handleItemClick(item)} 
              className={`hover:bg-white-200 ${item.isComingSoon ? "pointer-events-none" : "cursor-pointer"}`}	
              key={item.label}
            >
              <div className="flex items-center justify-center w-9 h-9 bg-primary-100/10 rounded-lg">
                {item.icon}
              </div>
              {item.isComingSoon ? (
                <CommingSoon className="ml-0" message="Coming Soon" />
              ) : (
                <strong className="font-bold text-sm leading-5">{item.label}</strong>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
