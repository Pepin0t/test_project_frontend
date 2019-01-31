import React from "react";

export const SVGBallsPaths = () => {
	return (
		<svg version="1.1" x="0" y="0" style={{ position: "absolute" }}>
			<defs>
				<g>
					<path
						id="image-ball-path"
						fill="none"
						stroke="#fff"
						strokeWidth="2"
						d="M 0 0 C -150 70, -150 -150, 0 -150 C 100 -150, 100 -50, 100 -50"
					/>
					<path id="description-ball-path" fill="none" stroke="#ff0033" strokeWidth="2" d="M 0 0 C -250 0, -100 -250, 0 -110" />

					<path id="other-ball-path" fill="none" stroke="#0000ff" strokeWidth="2" d="M 0 0 C 250 0, 100 -250, -100 -50" />
				</g>
			</defs>
		</svg>
	);
};
