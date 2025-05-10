function invertMap(map: { [key: number]: number }) {
	return Object.fromEntries(
		Object.entries(map).map(([k, v]) => [v, Number(k)])
	)
}

export const encode5b6b_data_N: { [key: number]: number } = {
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
export const decode6b5b_data_N = invertMap(encode5b6b_data_N)

// RD=-1 encoding tables
export const encode5b6b_data_P: { [key: number]: number } = {
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
export const decode6b5b_data_P = invertMap(encode5b6b_data_P)

export const encode5b6b_control_N: { [key: number]: number } = {
	0b10111: 0b111010, // K.23
	0b11011: 0b110110, // K.27
	0b11100: 0b001111, // K.28
	0b11101: 0b010001, // K.29
	0b11110: 0b011110, // K.30
}
export const decode6b5b_control_N = invertMap(encode5b6b_control_N)

export const encode5b6b_control_P: { [key: number]: number } = {
	0b10111: 0b000101, // K.23
	0b11011: 0b001001, // K.27
	0b11100: 0b110000, // K.28
	0b11101: 0b010001, // K.29
	0b11110: 0b100001, // K.30
}
export const decode6b5b_control_P = invertMap(encode5b6b_control_P)

export const encode3b4b_data_N: { [key: number]: number } = {
	0b000: 0b1011, // D.x.0 
	0b001: 0b1001, // D.x.1 
	0b010: 0b0101, // D.x.2 
	0b011: 0b1100, // D.x.3 
	0b100: 0b1101, // D.x.4 
	0b101: 0b1010, // D.x.5 
	0b110: 0b0110, // D.x.6 
	0b111: 0b1110, // D.x.P7
}
export const decode4b3b_data_N = invertMap(encode3b4b_data_N)

export const encode3b4b_data_P: { [key: number]: number } = {
	0b000: 0b0100, // D.x.0 
	0b001: 0b1001, // D.x.1 
	0b010: 0b0101, // D.x.2 
	0b011: 0b0011, // D.x.3 
	0b100: 0b0010, // D.x.4 
	0b101: 0b1010, // D.x.5 
	0b110: 0b0110, // D.x.6 
	0b111: 0b0001, // D.x.P7
}
export const decode4b3b_data_P = invertMap(encode3b4b_data_P)

export const encode3b4b_control_N: { [key: number]: number } = {
	0b000: 0b1011, // K.x.0
	0b001: 0b0110, // K.x.1
	0b010: 0b1010, // K.x.2
	0b011: 0b1100, // K.x.3
	0b100: 0b1101, // K.x.4
	0b101: 0b0101, // K.x.5
	0b110: 0b1001, // K.x.6
	0b111: 0b0111, // K.x.7
}
export const decode4b3b_control_N = invertMap(encode3b4b_control_N)

export const encode3b4b_control_P: { [key: number]: number } = {
	0b000: 0b0100, // K.x.0
	0b001: 0b1001, // K.x.1
	0b010: 0b0101, // K.x.2
	0b011: 0b0011, // K.x.3
	0b100: 0b0010, // K.x.4
	0b101: 0b1010, // K.x.5
	0b110: 0b0110, // K.x.6
	0b111: 0b1000, // K.x.7
}
export const decode4b3b_control_P = invertMap(encode3b4b_control_P)

export const control_chars: { [key: number]: string } = {
	0b00011100: "R=1C", // K.28.0=1C
	0b00111100: "/=3C", // K.28.1=3C
	0b01011100: "/=5C", // K.28.2=5C
	0b01111100: "A=7C", // K.28.3=7C
	0b10011100: "Q=9C", // K.28.4=9C
	0b10111100: "K=BC", // K.28.5=BC
	0b11011100: "/=DC", // K.28.6=DC
	0b11111100: "F=FC", // K.28.7=FC
	0b11110111: "/=F7", // K.23.7=F7
	0b11111011: "/=FB", // K.27.7=FB
	0b11111101: "/=FD", // K.29.7=FD
	0b11111110: "/=FE", // K.30.7=FE
}

// const decode_control_P: { [key: number]: number } = {
// 	 0b0011110100: 0b00011100, // K.28.0=1C
// 	 0b0011111001: 0b00111100, // K.28.1=3C
// 	 0b0011110101: 0b01011100, // K.28.2=5C
// 	 0b0011110011: 0b01111100, // K.28.3=7C
// 	 0b0011110010: 0b10011100, // K.28.4=9C
// 	 0b0011111010: 0b10111100, // K.28.5=BC
// 	 0b0011110110: 0b11011100, // K.28.6=DC
// 	 0b0011111000: 0b11111100, // K.28.7=FC
// 	 0b1110101000: 0b11110111, // K.23.7=F7
// 	 0b1101101000: 0b11111011, // K.27.7=FB
// 	 0b1011101000: 0b11111101, // K.29.7=FD
// 	 0b0111101000: 0b11111110, // K.30.7=FE
// }

// const decode_control_N: { [key: number]: number } = {
// 	0b1100001011: 0b00011100, // K.28.0=1C
// 	0b1100000110: 0b00111100, // K.28.1=3C
// 	0b1100001010: 0b01011100, // K.28.2=5C
// 	0b1100001100: 0b01111100, // K.28.3=7C
// 	0b1100001101: 0b10011100, // K.28.4=9C
// 	0b1100000101: 0b10111100, // K.28.5=BC
// 	0b1100001001: 0b11011100, // K.28.6=DC
// 	0b1100000111: 0b11111100, // K.28.7=FC
// 	0b0001010111: 0b11110111, // K.23.7=F7
// 	0b0010010111: 0b11111011, // K.27.7=FB
// 	0b0100010111: 0b11111101, // K.29.7=FD
// 	0b1000010111: 0b11111110, // K.30.7=FE
// }