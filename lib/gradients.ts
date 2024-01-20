export function createHex() {
	var hexCode1 = "";
	var hexValues1 = "0123456789abcdef";

	for (var i = 0; i < 6; i++) {
		hexCode1 += hexValues1.charAt(
			Math.floor(Math.random() * hexValues1.length)
		);
	}
	return hexCode1;
}

export const generateRandomGradient = () => {
	var gradient =
		"linear-gradient(" +
		45 +
		"deg, " +
		"#" +
		createHex() +
		" , " +
		"#" +
		createHex() +
		")";
	return gradient;
};

export const gradients = {
	color1: ["#334155", "#0f172a"],
	color2: ["#f97316", "#c2410c"],
	color3: ["#ef4444", "#991b1b"],
	color4: ["#fbbf24", "#b45309"],
	color5: ["#a3e635", "#4d7c0f"],
	color6: ["#4ade80", "#15803d"],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
	// ["", ""],
};

export const gradientDirections = [
	["top", "to top"],
	["top-right", "to top right"],
	["right", "to right"],
	["bottom-right", "to bottom right"],
	["bottom", "to bottom"],
	["bottom-left", "to bottom left"],
	["left", "to left"],
	["top-left", "to top left"],
];
