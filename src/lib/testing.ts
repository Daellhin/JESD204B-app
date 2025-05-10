import { decode8b10b } from "./8b10bDecoder"
import { encode8b10b } from "./8b10bEncoder"
import { numberToBinary } from "./utils"

function test_encode8b10b(toEncode: number, control: boolean, startRD: number) {
	const { sixBitCode, fourBitCode, symbol, RD } = encode8b10b(toEncode, control, startRD)
	console.log(`[Encode] Input: ${toEncode}(${numberToBinary(toEncode, 8)}); RD: ${startRD} | Output: ${symbol}(${numberToBinary(symbol, 10)}); RD: ${RD}`)
	console.log(`[Debug ] Input: ${toEncode}(${numberToBinary(toEncode, 8)}); RD: ${startRD} | 6b: ${sixBitCode}(${numberToBinary(sixBitCode, 6)}); 4b: ${fourBitCode}(${numberToBinary(fourBitCode, 4)})`)
	return { symbol, RD }
}

function test_decode8b10b(toDecode: number, startRD: number) {
	const { octet, RD, control } = decode8b10b(toDecode)
	console.log(`[Decode] Input: ${toDecode}(${numberToBinary(toDecode, 8)}); RD: ${startRD} | Output: ${octet}(${numberToBinary(octet, 10)}); RD: ${RD}`)
	return { octet, RD, control }
}

function main() {
	let RD = -1
	let symbol
	({ symbol, RD } = test_encode8b10b(1, false, RD))

	// -- Comparison --
	// const words = 'hello world'.split('').map(char => char.charCodeAt(0))
	// console.log("INP", words)

	// let runningDisparity = -1
	// const results_NPM = words.map(word => {
	// 	// console.log(`${numberToBinary(word, 8)}, ${0}, ${runningDisparity}`)
	// 	const result = encode({ word, runningDisparity })
	// 	runningDisparity = result.runningDisparity
	// 	return { RD: result.runningDisparity, symbol: result.symbol }
	// })
	// console.log("NPM", results_NPM.map(e => `${e.symbol} ${e.RD}`))

	// runningDisparity = +1
	// const results_OWN = words.map(word => {
	// 	const result = encode8b10b(word, false, runningDisparity)
	// 	runningDisparity = result.RD
	// 	return { symbol: result.symbol, RD: result.RD }
	// })
	// console.log("OWN", results_OWN.map(e => `${e.symbol} ${e.RD}`))
	// console.log("Match:", araArraysEqual(results_NPM, results_OWN))
}

// main()
