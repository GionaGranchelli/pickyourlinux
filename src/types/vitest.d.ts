declare module "vitest" {
    export type TestFn = () => void | Promise<void>;
    export const describe: (name: string, fn: TestFn) => void;
    export const it: (name: string, fn: TestFn) => void;
    export const expect: (value: unknown) => {
        toBe: (expected: unknown) => void;
        toEqual: (expected: unknown) => void;
    };
}
