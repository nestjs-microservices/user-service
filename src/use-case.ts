export interface UseCase<T> {
  exec(payload: T);
}
