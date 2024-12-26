import Link from 'next/link';

export default function Page() {
	return (
		<div className='mx-auto w-1/2 mt-24 text-center'>
			<h1 className='font-bold text-9xl mb-5'>404</h1>
			<div className=''>
				<p className='mb-2 text-2xl'>Oops, page not found</p>
				<span className='text-xl'>
					Back to{' '}
					<Link
						href='/'
						className='border-b-2 hover:opacity-50 transition-opacity'
					>
						main page
					</Link>
				</span>
			</div>
		</div>
	);
}
