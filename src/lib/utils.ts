export function araArraysEqual<T>(a: T[], b: T[]) {
	if (a === b) return true
	if (a == null || b == null) return false
	if (a.length !== b.length) return false
	return a.every((val, idx) => val === b[idx])
}

export function countOnes(n: number) {
	return n.toString(2).split('1').length - 1
}

export function numberToBinary(num: number, binarySize = 0, addPrefix = false) {
	const binary = num.toString(2)
	const padded = binary.padStart(binarySize, '0')
	return addPrefix ? '0b' + padded : padded
}

export function bitmask(width: number) {
	return Math.pow(2, width) - 1
}

export function invertBinary(num: number, binarySize: number) {
	return num ^ bitmask(binarySize)
}

export function formatValue(value: number, format: string, binarySize = 0) {
	if (format === "Binary") return value.toString(2).padStart(binarySize, "0")
	if (format === "Hexadecimal") return value.toString(16).toUpperCase()
	return value.toString()
}

export function parseValue(value: string, format: string): number {
	if (format === "Binary") return parseInt(value, 2)
	if (format === "Hexadecimal") return parseInt(value, 16)
	return parseInt(value, 10)
}
