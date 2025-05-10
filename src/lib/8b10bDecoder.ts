import { control_chars, decode4b3b_control_N, decode4b3b_control_P, decode4b3b_data_N, decode4b3b_data_P, decode6b5b_control_N, decode6b5b_control_P, decode6b5b_data_N, decode6b5b_data_P } from "./8b10bTables"

export type Decode8b10bResult = {
	octet: number
	RD: number
	control: boolean
}

export function isControlChar(symbol: number) {
	if (symbol in control_chars) {
		return `(${control_chars[symbol]})`
	}
	return ""
}

export function decode8b10b(symbol: number) {
	const upperSixBits = (symbol >> 4) & 0x3F
	const lowerFourBits = symbol & 0xF

	let lower5 = -1
	let upper3 = -1
	let control = false

	if (upperSixBits in decode6b5b_data_N) {
		lower5 = decode6b5b_data_N[upperSixBits]
	}
	else if (upperSixBits in decode6b5b_data_P)
		lower5 = decode6b5b_data_P[upperSixBits]
	else if (upperSixBits in decode6b5b_control_N) {
		lower5 = decode6b5b_control_N[upperSixBits]
		control = true
	}
	else if (upperSixBits in decode6b5b_control_P) {
		lower5 = decode6b5b_control_P[upperSixBits]
		control = true
	}
	console.log(lower5)

	if (lowerFourBits in decode4b3b_data_N)
		upper3 = decode4b3b_data_N[lowerFourBits]
	else if (lowerFourBits in decode4b3b_data_P)
		upper3 = decode4b3b_data_P[lowerFourBits]
	else if (lowerFourBits in decode4b3b_control_N) {
		upper3 = decode4b3b_control_N[lowerFourBits]
		control = true
	}
	else if (lowerFourBits in decode4b3b_control_P) {
		upper3 = decode4b3b_control_P[lowerFourBits]
		control = true
	}
	console.log(upper3)

	if (upper3 === -1 || lower5 === -1) {
		console.error("Invalid symbol: ", symbol.toString(2).padStart(10, '0'))
		return {
			octet: -1,
			RD: 0,
			control: false
		} as Decode8b10bResult
	}
	return {
		octet: (upper3 << 5) | lower5,
		RD: 0,
		control: control
	} as Decode8b10bResult
}