import crypto from 'node:crypto';
import { User } from "~/common/components/ui/images/mocks/User";

type ChatPreviewItem = {
	id: string;
	UserImage: React.ReactNode;
	userStatus: 'online' | 'offline' | 'away' | 'busy';
	userName: string;
	userDescription: string;
	messageTimestamp: string;
};

export const ChatPreviewItems: ChatPreviewItem[] = [
	{
		id: crypto.randomUUID(),
		UserImage: <User userNumber={1} />,
		userStatus: 'online',
		userName: 'Nicholas Gordon',
		userDescription: 'Moreover the striking, brilliant and vivid colors',
		messageTimestamp: '10m'
	},
	{
		id: crypto.randomUUID(),
		UserImage: <User userNumber={2} />,
		userStatus: 'offline',
		userName: 'Douglas Payne',
		userDescription: 'In the history of modern astronomy, there is small',
		messageTimestamp: '1hr'
	},
	{
		id: crypto.randomUUID(),
		UserImage: <User userNumber={3} />,
		userStatus: 'busy',
		userName: 'Harriett Robbins',
		userDescription: 'Advertising on a budget with a monthly frequency ',
		messageTimestamp: '2hr'
	},
	{
		id: crypto.randomUUID(),
		UserImage: <User userNumber={4} />,
		userStatus: 'away',
		userName: 'Polly Robbins',
		userDescription: 'Search Engine Optimization And Advertising',
		messageTimestamp: '1hr'
	}
];
