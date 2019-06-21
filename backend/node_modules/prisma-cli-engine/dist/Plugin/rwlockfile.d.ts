export declare function unread(path: string, timeout?: number): Promise<void>;
export interface WriteLockOptions {
    timeout?: number;
    skipOwnPid?: boolean;
}
/**
 * lock for writing
 * @param path {string} - path of lockfile to use
 * @param options {object}
 * @param [options.timeout=60000] {number} - Max time to wait for lockfile to be open
 * @param [options.skipOwnPid] {boolean} - Do not wait on own pid (to upgrade current process)
 * @returns {Promise}
 */
export declare function write(path: string, options?: WriteLockOptions): Promise<() => Promise<void>>;
export interface ReadLockOptions {
    timeout: number;
}
/**
 * lock for reading
 * @param path {string} - path of lockfile to use
 * @param options {object}
 * @param [options.timeout=60000] {number} - Max time to wait for lockfile to be open
 * @returns {Promise}
 */
export declare const read: (path: string, options?: any) => Promise<() => Promise<void>>;
/**
 * check if active writer
 * @param path {string} - path of lockfile to use
 */
export declare function hasWriter(p: string): Promise<boolean>;
export declare function hasReaders(p: string, options?: WriteLockOptions): Promise<boolean>;
export declare function cleanup(): void;
