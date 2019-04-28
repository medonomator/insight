/**
 * Регистрация пользователя в системе
 * В ответ возвращается userId пользователя, если регистрация успешна
 */
export interface IUser {
  email: string;
  password: string;
  name: string;
}
