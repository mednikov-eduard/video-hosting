/**
 * интерфейс пользователя
 * @param id - идентификатор пользователя
 * @param name - имя пользователя
 * @param email - почта пользователя
 * @param password - пароль пользователя
 */
export interface IUser{
	id: number;
	name: string;
	email?: string;
	password?: string;
} 