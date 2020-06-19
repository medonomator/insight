export interface IRedisModel<T> {
  set(surname: object): Promise<void>;
  getAll(): Promise<T>;
}
