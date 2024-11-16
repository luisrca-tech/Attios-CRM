import { ArrowDown } from './ArrowDown';
import { ClosePadlockIcon } from './ClosePadlock';
import { EmailIcon } from './Email';
import { ErrorIcon } from './ErrorIcon';
import { FacebookIcon } from './Facebook';
import { GoogleIcon } from './Google';
import { GraphIcon } from './Graph';
import { OpenPadlockIcon } from './OpenPadlock';
import { TwitterIcon } from './Twitter';
import { UserIcon } from './UserIcon';

export const Icon = {
	Email: EmailIcon,
	User: UserIcon,
	Error: ErrorIcon,
	Graph: GraphIcon,
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
	}
};
