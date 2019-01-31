export const ballPathAnimation = (element, options, cb = {}) => {
	let draw;

	switch (element.id) {
		case "image-ball": {
			draw = (progress, path, pathLength) => {
				let currentPoint = Math.floor(pathLength * progress);

				const pt = path.getPointAtLength(currentPoint);

				const styles = {
					transform: `translate(${pt.x}px, ${pt.y}px)`,
					border: `${progress * 4}px solid rgba(0, 0, 0, ${progress * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		case "description-ball": {
			draw = (progress, path, pathLength) => {
				let currentPoint = Math.floor(pathLength * progress);

				const pt = path.getPointAtLength(currentPoint);

				const styles = {
					transform: `translate(${pt.x}px, ${pt.y}px) scale(${1 - progress * 0.5})`,
					boxShadow: `0 0 0 ${progress * 10}px #fff`,
					border: `${progress * 10}px solid rgba(0, 0, 0, ${progress * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		case "other-ball": {
			draw = (progress, path, pathLength) => {
				let currentPoint = Math.floor(pathLength * progress);

				const pt = path.getPointAtLength(currentPoint);

				const styles = {
					transform: `translate(${pt.x}px, ${pt.y}px)`,
					boxShadow: `0 0 0 ${progress * 3}px #fff`,
					border: `${progress * 5}px solid rgba(0, 0, 0,${progress * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		default:
			return;
	}

	const defaultTiming = timeFraction => {
		return --timeFraction * timeFraction * timeFraction + 1;
	};

	const start = performance.now();
	const { pathId, duration, delay = 0, timing = defaultTiming } = options;

	const path = document.getElementById(pathId);
	let pathLength = path.getTotalLength();

	let requestID = requestAnimationFrame(function anim(time) {
		let timeFraction = (time - start - delay) / duration;

		if (timeFraction > 1) timeFraction = 1;

		const progress = timing(timeFraction);

		if (timeFraction >= 0) {
			draw(progress, path, pathLength);
		}

		if (timeFraction < 1) {
			requestAnimationFrame(anim);
		} else {
			cb.afterEnd && cb.afterEnd();
			cancelAnimationFrame(requestID);
		}
	});
};

export const errorCloseAnimation = (element, options, callback) => {
	const transform = window
		.getComputedStyle(element)
		.getPropertyValue("transform")
		.slice(7, -1)
		.split(",");

	const transformX = +transform[4];
	const transformY = +transform[5];

	let draw;

	switch (element.id) {
		case "image-ball": {
			element.style.transform = `translate(${transformX}px, ${transformY}px)`;
			element.classList.remove("waiting");

			draw = (progress, transformX, transformY) => {
				const styles = {
					transform: `translate(${(1 - progress) * transformX}px, ${(1 - progress) * transformY}px)`,
					border: `${(1 - progress) * 4}px solid rgba(0, 0, 0, ${(1 - progress) * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		case "description-ball": {
			element.style.transform = `translate(${transformX}px, ${transformY}px) scale(0.5)`;
			element.classList.remove("waiting");

			draw = (progress, transformX, transformY) => {
				const styles = {
					transform: `translate(${(1 - progress) * transformX}px, ${(1 - progress) * transformY}px) scale(${0.5 + progress * 0.5})`,
					boxShadow: `0 0 0 ${(1 - progress) * 10}px #fff`,
					border: `${(1 - progress) * 10}px solid rgba(0, 0, 0, ${(1 - progress) * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		case "other-ball": {
			element.style.transform = `translate(${transformX}px, ${transformY}px)`;
			element.classList.remove("waiting");

			draw = (progress, transformX, transformY) => {
				const styles = {
					transform: `translate(${(1 - progress) * transformX}px, ${(1 - progress) * transformY}px)`,
					boxShadow: `0 0 0 ${(1 - progress) * 3}px #fff`,
					border: `${(1 - progress) * 5}px solid rgba(0, 0, 0, ${(1 - progress) * 0.5})`
				};

				Object.assign(element.style, styles);
			};
			break;
		}

		default:
			return;
	}

	const defaultTiming = timeFraction => {
		return timeFraction * timeFraction;
	};

	let start = performance.now();
	const { duration, delay = 0, timing = defaultTiming } = options;

	const requestID = requestAnimationFrame(function anim(time) {
		let timeFraction = (time - start - delay) / duration;

		if (timeFraction > 1) timeFraction = 1;

		const progress = timing(timeFraction);

		if (timeFraction >= 0) {
			draw(progress, transformX, transformY);
		}

		if (timeFraction < 1) {
			requestAnimationFrame(anim);
		} else {
			callback && callback();
			cancelAnimationFrame(requestID);
		}
	});
};
