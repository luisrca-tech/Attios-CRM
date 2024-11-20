import { User1 } from '~/common/components/ui/images/mocks/User1';
import { User2 } from '~/common/components/ui/images/mocks/User2';
import { User3 } from '~/common/components/ui/images/mocks/User3';
import { User4 } from '~/common/components/ui/images/mocks/User4';

type ChatPreviewItem = {
	id: string;
	UserImage: React.ComponentType<{ className?: string }>;
	userStatus: 'online' | 'offline' | 'away' | 'busy';
	userName: string;
	userDescription: string;
	messageTimestamp: string;
};

export const ChatPreviewItems: ChatPreviewItem[] = [
	{
		id: crypto.randomUUID(),
		UserImage: User1,
		userStatus: 'online',
		userName: 'Nicholas Gordon',
		userDescription: 'Moreover the striking, brilliant and vivid colors',
		messageTimestamp: '10m'
	},
	{
		id: crypto.randomUUID(),
		UserImage: User2,
		userStatus: 'offline',
		userName: 'Douglas Payne',
		userDescription: 'In the history of modern astronomy, there is small',
		messageTimestamp: '1hr'
	},
	{
		id: crypto.randomUUID(),
		UserImage: User3,
		userStatus: 'busy',
		userName: 'Harriett Robbins',
		userDescription: 'Advertising on a budget with a monthly frequency ',
		messageTimestamp: '2hr'
	},
	{
		id: crypto.randomUUID(),
		UserImage: User4,
		userStatus: 'away',
		userName: 'Polly Robbins',
		userDescription: 'Search Engine Optimization And Advertising',
		messageTimestamp: '1hr'
	}
];
