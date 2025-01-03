import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

import { authService } from '@/services/auth.service';
import { useTypedSelector } from '@/store';

export function Logout() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => {
			authService.logout();
		}
	});

	const { isLoggedIn } = useTypedSelector(state => state.auth);

	if (!isLoggedIn) return null;

	return (
		<button
			onClick={() => mutate()}
			className={'group py-3 flex items-center gap-5 '}
		>
			<LogOut className={'group-hover:text-primary transition group-hover:rotate-6 min-w-6'} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	);
}
