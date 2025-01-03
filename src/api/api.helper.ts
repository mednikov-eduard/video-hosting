export const errorCatch = (error: {
	message: string;
	response: { data: { message: string } };
}): string => {
	const message = error.message;

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message;
};
