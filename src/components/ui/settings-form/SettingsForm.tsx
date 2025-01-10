'use client';

import { Controller } from 'react-hook-form';

import { useSettings } from '@/hooks/useSettings';

import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Textarea } from '../field/Textarea';
import { UploadField } from '../upload-field/UploadField';

export function SettingsForm() {
	const {
		form: {
			handleSubmit,
			register,
			formState: { errors },
			control
		},
		onSubmit,
		isLoading
	} = useSettings();

	return (
		<div className='w-3/5'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-10'>
					<div>
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
							registration={register('password')}
							error={errors.password?.message}
							placeholder='Enter password:'
						/>

						<Field
							label='Name'
							type='text'
							registration={register('name')}
							error={errors.name?.message}
							placeholder='Enter name:'
						/>
						<Field
							label='Slug'
							type='text'
							registration={register('channel.slug')}
							error={errors.channel?.slug?.message}
							placeholder='Enter slug:'
						/>
						<Textarea
							label='Description'
							registration={register('channel.description')}
							error={errors.channel?.description?.message}
							placeholder='Description'
							rows={4}
						/>
					</div>
					<div>
						<Controller
							control={control}
							name='channel.avatarUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Avatar'
									onChange={onChange}
									value={value}
									error={error}
									folder='avatars'
									className='mb-5'
								/>
							)}
						/>
						<Controller
							control={control}
							name='channel.bannerUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Banner'
									onChange={onChange}
									value={value}
									error={error}
									folder='banners'
									aspectRation='16:9'
									overlay='/overlay.png'
								/>
							)}
						/>
					</div>
				</div>
				<div className='text-center mt-10'>
					<Button
						type='submit'
						isLoading={isLoading}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	);
}
