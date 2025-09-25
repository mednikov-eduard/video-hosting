'use client';

import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Logo } from '@/ui/logo/Logo';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { useAuthForm } from '@/hooks/useAuthForm';

import type { IAuthForm } from './auth-form.types';

const DynamicRecaptcha = dynamic(() =>
	import('@/components/recaptcha/Recaptcha').then(mod => mod.Recaptcha)
);

const ForwardedRefRecaptcha = forwardRef<ReCAPTCHA>((props, ref) => (
	<DynamicRecaptcha
		{...props}
		forwardedRef={ref}
	/>
));
export function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<IAuthForm>({ mode: 'onChange' });

	const { onSubmit, recaptchaRef, isLoading } = useAuthForm(isLogin ? 'login' : 'register', reset);

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='w-1/4 p-layout border-border border rounded'>
				<div className='text-center mb-2'>
					<Logo />
				</div>
				<div className='flex justify-center mb-6'>
					<button
						type='button'
						className={`px-4 py-2 font-semibold ${
							isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
						}`}
						onClick={() => setIsLogin(true)}
					>
						Login
					</button>
					<button
						type='button'
						className={`px-4 py-2 font-semibold ${
							!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
						}`}
						onClick={() => setIsLogin(false)}
					>
						Register
					</button>
				</div>
				{isLoading ? (
					<SkeletonLoader count={4} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Field
							label='Email'
							type='email'
							registration={register('email', { required: 'Email is required!' })}
							error={errors.email?.message}
							placeholder='Enter email:'
						/>
						<Field
							label='Password'
							type='password'
							registration={register('password', { required: 'Password is required!' })}
							error={errors.password?.message}
							placeholder='Enter password:'
						/>
						{!isLogin && (
							<Field
								label='Password confirm'
								type='password'
								registration={register('confirmPassword', {
									required: 'Password confirmation is required!',
									validate: value => value === watch('password') || 'Passwords don`t match!'
								})}
								error={errors.confirmPassword?.message}
								placeholder='Enter password again:'
							/>
						)}

						<ForwardedRefRecaptcha ref={recaptchaRef} />

						<div className='text-center mt-6'>
							<Button
								type='submit'
								isLoading={isLoading}
							>
								{isLogin ? 'Login' : 'Register'}
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
