export const to = <T>(promise: Promise<T>): Promise<[Error | undefined, T]> =>
  promise
    .then<[undefined, T]>((data: T) => [undefined, data])
    .catch<[Error, any]>((error: Error) => [error, undefined]);
