import { encode3b4b_control_N, encode3b4b_data_N, encode5b6b_control_N, encode5b6b_data_N } from "./8b10bTables"
import { countOnes, invertBinary, numberToBinary } from "./utils"

export type Encode8b10bResult = {
	sixBitCode: number
	fourBitCode: number
	symbol: number
	RD: number
}

/**
 * Source: https://www.wikiwand.com/en/articles/8b/10b_encoding
 * - Using negation tricks to use only negative encoding tables
 * - RD=-1: add ones, RD=+1: add zeros
 */
export function encode8b10b(octet: number, control: boolean, RD = -1) {
	const lower5 = octet & 0x1F
	const upper3 = (octet >> 5) & 0x07

	// -- Get 6b code based on current running disparity --
	let sixBitCode = (control ? encode5b6b_control_N : encode5b6b_data_N)[lower5]
	const ones_sixBitCode = countOnes(sixBitCode)
	// IF: need to add zeros and can invert
	if (RD === +1 && (ones_sixBitCode === 4 || lower5 === 0b00111)) {
		sixBitCode = invertBinary(sixBitCode, 6) // inverting adds more zeros
	}
	if (ones_sixBitCode === 4) RD = -RD

	// -- Get 4b code based on new running disparity --
	let fourBitCode = (control ? encode3b4b_control_N : encode3b4b_data_N)[upper3]
	// P7 A7 correction: D.x.A7 is used when (RD = −1: for x = 17, 18, 20) or (when RD = +1: for x = 11, 13, 14)
	if (upper3 === 0b111 && (
		(RD === -1 && (lower5 === 0b10001 || lower5 === 0b10010 || lower5 === 0b10100)) ||
		(RD === +1 && (lower5 === 0b01011 || lower5 === 0b01101 || lower5 === 0b01110))
	)) {
		fourBitCode = 0b0111
		console.log("P7 A7 correction")
	}
	const ones_fourBitCode = countOnes(fourBitCode)
	// IF: need to add zeros and can invert
	if (RD === +1 && (ones_fourBitCode === 3 || upper3 === 0b011 || control)) {
		fourBitCode = invertBinary(fourBitCode, 4) // inverting adds more zeros
	}
	if (ones_fourBitCode === 3) RD = -RD

	const symbol = (sixBitCode << 4) | fourBitCode
	return {
		sixBitCode,
		fourBitCode,
		symbol,
		RD
	} as Encode8b10bResult
}
