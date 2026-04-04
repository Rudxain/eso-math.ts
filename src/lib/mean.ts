import { isSigned } from "../mod/value-check.ts";
import { MAX_LB, MIN_LB, PRECISION } from "../mod/const.js";

/**
Geometric mean.
Tries to preserve precision by avoiding {over,under}flow.

If `a * b` is `-0`, this returns `NaN`; against what
[the spec](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.sqrt)
says.
This is intentionally opinionated
*/
const gm_auto = (a: number, b: number) => {
	if (isNaN(a) || isNaN(b) || isSigned(a) != isSigned(b)) {
		return NaN;
	}

	// simplify further ops
	a = Math.abs(a);
	b = Math.abs(b);

	// just in case
	if ((a == 0 && b == Infinity) || (a == Infinity && b == 0)) return NaN;
	if (a == Infinity || b == Infinity) return Infinity;
	if (a == 0 || b == 0) return 0;

	// accuracy
	if (a == b) return a;

	// get order of magnitude via binary logarithm;
	// lb should be faster and more accurate than ln
	const l = Math.log2(a) + Math.log2(b);
	// if the product would {over,under}flow,
	// use logarithm hack to preserve precision
	if (l >= MAX_LB - PRECISION || l <= MIN_LB + PRECISION) {
		return 2 ** (l / 2);
	}
	// otherwise do naive approach, for accuracy
	return Math.sqrt(a * b);
};

/**
Arithmetic-Geometric Mean.
This is just an approximation, because of rounding errors
*/
export const agm = (x: number, y: number) => {
	// avoid round-errors and increase efficiency
	if (x == y) return x;
	let a = NaN, i = 0;
	do [x, y, a, i] = [(x + y) / 2, gm_auto(x, y), x, i + 1]; while (
		x != a && x == x && i < 0x20
	);
	// 1st condition "squeezes" all the precision,
	// 2nd prevents potential infinite loop (1st also helps),
	// 3rd guarantees halting when edge-cases happen
	// (32 iterations is more than enough for convergence)
	return x;
};
