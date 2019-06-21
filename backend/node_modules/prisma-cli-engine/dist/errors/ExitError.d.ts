export default class ExitError extends Error {
    code: number;
    constructor(code: number);
}
