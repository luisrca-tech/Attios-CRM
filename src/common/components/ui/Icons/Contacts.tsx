import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import ContactsIconImage from '/public/icons/sidebar/contacts.png';

export function ContactsIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ContactsIconImage} alt="Contacts" />
	);
}
