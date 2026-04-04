import { M as nthMersenne } from "../lib/Mersenne.js"

/** 2pi */
export const TAU = Math.PI * 2

export const
	SQRT5 = 5 ** 0.5,
	/** The Golden Ratio */
	PHI = SQRT5 / 2 + 0.5

/** maximum 64bit unsigned int */
export const MAX64 = nthMersenne(0x40n)

/**
bit length of IEEE-754 binary64 float significand.

also the max entropy of {@link Math.random}
*/
export const MANTISSA_SIZE = 52

/**
Significant precision of `Float64` (`number`) including implicit bit.
Equal to `Math.log2(Number.MAX_SAFE_INTEGER + 1)`
*/
export const PRECISION = MANTISSA_SIZE + 1;

/** Maximum binary logarithm */
export const MAX_LB = Math.log2(Number.MAX_VALUE);

// `Number.MIN_VALUE` is subnormal,
// but we need normals to preserve precision
/** Minimum binary logarithm of non-subnormals */
export const MIN_LB = -MAX_LB;
