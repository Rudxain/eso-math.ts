import { numeric } from "../typedefs.ts";
import { is_numeric } from "./type check.js";

/**
check if primitive integer

this is not future proof:
if `BigFloat`s are added, this will return `false` for any of them
*/
export function isInt(x: bigint): true;
export function isInt(x: unknown): boolean;
export function isInt(x: unknown) {
	return (typeof x == "number" && x % 1 == 0) || typeof x == "bigint";
}

/**
check if either `Infinity` sign
@template T
@param {T} x
*/
//there's no `+-Infinity` literals: https://github.com/microsoft/TypeScript/issues/32277
export const isInf = <T>(
	x: T,
) => /**@type {T extends number ? boolean : false}*/ (
	x === +Infinity || x === -Infinity
);

/**
same as `Number.isNaN` but with richer type checking
@template T
@param {T} x
*/
//there's no `NaN` literal: https://github.com/microsoft/TypeScript/issues/32277
//eslint-disable-next-line no-self-compare
export const isNAN = <T>(
	x: T,
) => /**@type {T extends number ? boolean : false}*/ (
	typeof x == "number" && x != x
);

/**
check if either `Infinity` or `NaN`
@template T
@param {T} x
*/
export const isInfNAN = <T>(x: T) => isInf(x) || isNAN(x);

/**
check if signed/negative/minus zero `-0`

unlike `Object.is`, this fn is 100% pure
*/
//since `-0` and `0` are considered equal by TS, we can't just use `true`
export function isNegZero(x: 0 | -0): boolean;
export function isNegZero(x: unknown): false;
export function isNegZero(x: unknown) {
	return x === 0 && 1 / x < 0;
}

/**
check if it has a sign (includes `-0`)
@returns `true` if sign-bit is set (except for `NaN`, where it returns `false`)
*/
export const isSigned = <T>(
	x: T,
): T extends numeric ? boolean : false => (
	//@ts-ignore
	is_numeric(x) && ((x as numeric) < 0 || isNegZero(x))
);
