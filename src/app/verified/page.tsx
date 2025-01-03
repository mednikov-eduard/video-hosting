import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
	return (
		<div className='mx-auto w-1/2 mt-24 text-center flex flex-col items-center'>
			<h1 className='font-bold text-5xl mb-5 inline-flex gap-2 items-center'>
				<Check
					size={60}
					className='text-green-500'
				/>
				<span>Email successfully verified!</span>
			</h1>
			<Link
				href='/'
				className='text-3xl hover:opacity-50 transition-opacity'
			>
				On main page
			</Link>
		</div>
	);
}
