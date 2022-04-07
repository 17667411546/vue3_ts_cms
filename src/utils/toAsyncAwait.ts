/**
 * @param { Promise } promise
 * @param { Object= } errorExt -可以传递给err对象的其他信息
 * @return { Promise }
 */
export function toAsyncAwait<T, U = Error>(
    promise: Promise<T>
): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data]) // 执行成功，返回数组第一项为 null。第二个是结果。
        .catch<[U, undefined]>((err: U) => {
            return [err, undefined]; // 执行失败，返回数组第一项为错误信息，第二项为 undefined
        });
}
