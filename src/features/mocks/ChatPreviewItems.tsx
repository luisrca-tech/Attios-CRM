type ChatPreviewItem = {
	id: string;
	userImage: string;
	userStatus: 'online' | 'offline' | 'away' | 'busy';
	userName: string;
	userDescription: string;
	messageTimestamp: string;
};

export const ChatPreviewItems: ChatPreviewItem[] = [
	{
		id: crypto.randomUUID(),
		userImage: '/images/mocks/users/1.png',
		userStatus: 'online',
		userName: 'Nicholas Gordon',
		userDescription: 'Moreover the striking, brilliant and vivid colors',
		messageTimestamp: '10m'
	},
	{
		id: crypto.randomUUID(),
		userImage: '/images/mocks/users/2.png',
		userStatus: 'online',
		userName: 'Douglas Payne',
		userDescription: 'In the history of modern astronomy, there is small',
		messageTimestamp: '1hr'
	},
	{
		id: crypto.randomUUID(),
		userImage: '/images/mocks/users/3.png',
		userStatus: 'busy',
		userName: 'Harriett Robbins',
		userDescription: 'Advertising on a budget with a monthly frequency ',
		messageTimestamp: '2hr'
	},
	{
		id: crypto.randomUUID(),
		userImage: '/images/mocks/users/4.png',
		userStatus: 'away',
		userName: 'Polly Robbins',
		userDescription: 'Search Engine Optimization And Advertising',
		messageTimestamp: '1hr'
	}
];
