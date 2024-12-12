import { atom } from "jotai";
import { addActionItems } from "~/common/constants/addActionItems";

export const selectedAddAction = atom<typeof addActionItems[0] | null>(null);
