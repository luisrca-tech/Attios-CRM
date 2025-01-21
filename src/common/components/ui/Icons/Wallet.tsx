import Image from 'next/image';
import WalletIconImage from '/public/icons/wallet.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function WalletIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={WalletIconImage} alt="Wallet icon" />
	);
}
