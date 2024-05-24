/**
https://developer.mozilla.org/en-US/docs/Glossary/Primitive
*/
export type primitive = numstr | boolean | undefined | null | symbol;

/**
any strictly numerical value
*/
export type numeric = number | bigint;

export type numstr = numeric | string;

/**
2-tuple of format [numerator, denominator]
*/
export type fraction<T extends numeric> = [T, T];

/**
2x2 matrix encoded as a 1D array
*/
export type matrix2x2<T> = [T, T, T, T];
