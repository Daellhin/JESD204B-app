import { decode } from "8b10b"


// -- Utils --
function araArraysEqual<T>(a: T[], b: T[]) {
	if (a === b) return true
	if (a == null || b == null) return false
	if (a.length !== b.length) return false
	return a.every((val, idx) => val === b[idx])
}

function countOnes(n: number) {
	return n.toString(2).split('1').length - 1
}

function numberToBinary(num: number, binarySize = 0, addPrefix = false) {
	const binary = num.toString(2)
	const padded = binary.padStart(binarySize, '0')
	return addPrefix ? '0b' + padded : padded
}

function bitmask(width: number) {
	return Math.pow(2, width) - 1
}

function invertBinary(num: number, binarySize: number) {
	return num ^ bitmask(binarySize)
}

// Disparity = number of 1s - number of 0s
// RD=-1: add ones, RD=+1: add zeros
function calculateDisparity(value: number, binarySize: number) {
	const ones = countOnes(value)
	const zeros = binarySize - ones
	return ones - zeros
}

// -- Constants --
// RD=-1 encoding tables
const encode5b6b_data: { [key: number]: number } = {
	0b00000: 0b100111, // D.00
	0b00001: 0b011101, // D.01
	0b00010: 0b101101, // D.02
	0b00011: 0b110001, // D.03
	0b00100: 0b110101, // D.04
	0b00101: 0b101001, // D.05
	0b00110: 0b011001, // D.06
	0b00111: 0b111000, // D.07
	0b01000: 0b111001, // D.08
	0b01001: 0b100101, // D.09
	0b01010: 0b010101, // D.10
	0b01011: 0b110100, // D.11
	0b01100: 0b001101, // D.12
	0b01101: 0b101100, // D.13
	0b01110: 0b011100, // D.14
	0b01111: 0b010111, // D.15
	0b10000: 0b011011, // D.16
	0b10001: 0b100011, // D.17
	0b10010: 0b010011, // D.18
	0b10011: 0b110010, // D.19
	0b10100: 0b001011, // D.20
	0b10101: 0b101010, // D.21
	0b10110: 0b011010, // D.22
	0b10111: 0b111010, // D.23
	0b11000: 0b110011, // D.24
	0b11001: 0b100110, // D.25
	0b11010: 0b010110, // D.26
	0b11011: 0b110110, // D.27
	0b11100: 0b001110, // D.28
	0b11101: 0b101110, // D.29
	0b11110: 0b011110, // D.30
	0b11111: 0b101011, // D.31
}

// RD=-1 encoding tables
const encode5b6b_data_alt: { [key: number]: number } = {
	0b00000: 0b011000, // D.00
	0b00001: 0b100010, // D.01
	0b00010: 0b010010, // D.02
	0b00011: 0b110001, // D.03
	0b00100: 0b001010, // D.04
	0b00101: 0b101001, // D.05
	0b00110: 0b011001, // D.06
	0b00111: 0b000111, // D.07
	0b01000: 0b000110, // D.08
	0b01001: 0b100101, // D.09
	0b01010: 0b010101, // D.10
	0b01011: 0b110100, // D.11
	0b01100: 0b001101, // D.12
	0b01101: 0b101100, // D.13
	0b01110: 0b011100, // D.14
	0b01111: 0b101000, // D.15
	0b10000: 0b100100, // D.16
	0b10001: 0b100011, // D.17
	0b10010: 0b010011, // D.18
	0b10011: 0b110010, // D.19
	0b10100: 0b001011, // D.20
	0b10101: 0b101010, // D.21
	0b10110: 0b011010, // D.22
	0b10111: 0b000101, // D.23
	0b11000: 0b001100, // D.24
	0b11001: 0b100110, // D.25
	0b11010: 0b010110, // D.26
	0b11011: 0b001001, // D.27
	0b11100: 0b001110, // D.28
	0b11101: 0b010001, // D.29
	0b11110: 0b100001, // D.30
	0b11111: 0b010100, // D.31
}

const encode5b6b_control: { [key: number]: number } = {
	0b10111: 0b111010, // K.23
	0b11011: 0b110110, // K.27
	0b11100: 0b001111, // K.28
	0b11101: 0b101110, // K.29
	0b11110: 0b011110, // K.30
}

const encode3b4b_data: { [key: number]: number } = {
	0b000: 0b1011, // D.x.0 
	0b001: 0b1001, // D.x.1 
	0b010: 0b0101, // D.x.2 
	0b011: 0b1100, // D.x.3 
	0b100: 0b1101, // D.x.4 
	0b101: 0b1010, // D.x.5 
	0b110: 0b0110, // D.x.6 
	0b111: 0b1110, // D.x.P7
}

const encode3b4b_control: { [key: number]: number } = {
	0b000: 0b1011, // K.x.0
	0b001: 0b0110, // K.x.1
	0b010: 0b1010, // K.x.2
	0b011: 0b1100, // K.x.3
	0b100: 0b1101, // K.x.4
	0b101: 0b0101, // K.x.5
	0b110: 0b1001, // K.x.6
	0b111: 0b0111, // K.x.7
}

function zeroOneDifference(n: number) {
	const ones = countOnes(n)
	const zeros = 10 - ones
	return zeros - ones
}

// -- Encode Functions --
// Source: https://www.wikiwand.com/en/articles/8b/10b_encoding
function encode8b10b(octet: number, control: boolean, RD = -1) {
	const lower5 = octet & 0x1F
	const upper3 = (octet >> 5) & 0x07

	// -- Get 6b code based on current running disparity --
	let sixBitCode = (control ? encode5b6b_control : encode5b6b_data)[lower5]
	const ones_sixBitCode = countOnes(sixBitCode)
	// IF: need to add zeros and can invert
	if (RD === +1 && (ones_sixBitCode === 4 || lower5 === 0b00111)) {
		sixBitCode = invertBinary(sixBitCode, 6) // inverting adds more zeros
	}
	if (ones_sixBitCode === 4) RD = -RD

	// -- Get 4b code based on new running disparity --
	let fourBitCode = (control ? encode3b4b_control : encode3b4b_data)[upper3]
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
	}
}

function test_encode8b10b(toEncode: number, control: boolean, startRD: number) {
	const { sixBitCode, fourBitCode, symbol, RD } = encode8b10b(toEncode, control, startRD)
	console.log(`[Encode] Input: ${toEncode}(${numberToBinary(toEncode, 8)}); RD: ${startRD} | Output: ${symbol}(${numberToBinary(symbol, 10)}); RD: ${RD}`)
	console.log(`[Debug ] Input: ${toEncode}(${numberToBinary(toEncode, 8)}); RD: ${startRD} | 6b: ${sixBitCode}(${numberToBinary(sixBitCode, 6)}); 4b: ${fourBitCode}(${numberToBinary(fourBitCode, 4)})`)
	return { symbol, RD }
}

// function test_decode8b10b(toDecode: number, startRD: number) {
// 	const res = decode({ symbol: toDecode, runningdisparity: startRD })
// 	console.log(`[Decode] Input: ${toDecode}(${numberToBinary(toDecode, 8)}); RD: ${startRD} | Output: ${res.word}(${numberToBinary(res.word, 10)}); RD: ${res.runningDisparity}`)
// 	return { octet: res.word, RD: res.runningDisparity }
// }

// // RD=-1: add ones, RD=+1: add zeros
// function main() {
// 	let RD = -1
// 	let symbol
// 	({ symbol, RD } = test_encode8b10b(1, false, RD))
// 	// test_decode8b10b(symbol, -1)

// 	// -- Comparison --
// 	// const words = 'hello world'.split('').map(char => char.charCodeAt(0))
// 	// console.log("INP", words)

// 	// let runningDisparity = -1
// 	// const results_NPM = words.map(word => {
// 	// 	// console.log(`${numberToBinary(word, 8)}, ${0}, ${runningDisparity}`)
// 	// 	const result = encode({ word, runningDisparity })
// 	// 	runningDisparity = result.runningDisparity
// 	// 	return { RD: result.runningDisparity, symbol: result.symbol }
// 	// })
// 	// console.log("NPM", results_NPM.map(e => `${e.symbol} ${e.RD}`))

// 	// runningDisparity = +1
// 	// const results_OWN = words.map(word => {
// 	// 	const result = encode8b10b(word, false, runningDisparity)
// 	// 	runningDisparity = result.RD
// 	// 	return { symbol: result.symbol, RD: result.RD }
// 	// })
// 	// console.log("OWN", results_OWN.map(e => `${e.symbol} ${e.RD}`))
// 	// console.log("Match:", araArraysEqual(results_NPM, results_OWN))
// }

// // async function calculateDisparities(startRD: number, input_filename: string, output_filename: string) {
// // 	using file = await Deno.open(input_filename)
// // 	const readable = file.readable
// // 		.pipeThrough(new TextDecoderStream()) // decode Uint8Array to string
// // 		.pipeThrough(new TextLineStream()) // split string line by line

// // 	let output = ""
// // 	for await (const line of readable) {
// // 		const output_RD_number = startRD + calculateDisparity(parseInt(line, 2), 10)
// // 		const output_RD_bit = output_RD_number === -1 ? "0" : "1"

// // 		output += `${output_RD_bit}\n`
// // 		console.log(output)
// // 	}
// // 	await Deno.writeTextFile(output_filename, output)
// // }

// // -- Create test file helpers --
// // calculateDisparities(-1, "symbols_N.txt", "RDs_N.txt")
// // calculateDisparities(+1, "symbols_P.txt", "RDs_P.txt")
// // calculateDisparities(-1, "symbols_control_N.txt", "RDs_control_N.txt")
// // calculateDisparities(+1, "symbols_control_P.txt", "RDs_control_P.txt")
// // console.log([28, 60, 92, 124, 156, 188, 220, 252, 247, 251, 253, 254].map(e => numberToBinary(e, 8)))

// main()
