import React from "react";
import { shallow, mount } from "enzyme";

import { Cookies } from "react-cookie";

import { Modal } from "../components/modals_and_other/modal_product_item/ModalProductItem";
import { shoppingCart } from "../utils/shopping_cart/checkShoppingCart";

describe("<ModalProductItem />", () => {
	const props = {
		getProductItemFullDescription: jest.fn(),
		sendToCart: jest.fn(),
		loading: new Promise(resolve => {
			resolve();
		}),
		match: {
			params: {
				productId: "K-831662"
			}
		},
		history: {},
		cookies: new Cookies(),
		readyToStartModalAnimation: undefined
	};
	// const component = shallow(<Modal {...props} />);

	// it("Snapshot", () => {
	// 	expect(component).toMatchSnapshot();
	// });

	describe("Component initial", () => {
		jest.spyOn(Modal.prototype, "animationStateMachine");
		jest.spyOn(Modal.prototype, "classNamesSelector");
		const component = shallow(<Modal {...props} />);

		it("Component did mount", () => {
			const classNames = {
				"modal-window": "",
				"image-ball": "",
				"description-ball": "",
				"other-ball": "",
				"loading-events": "",
				"controls-events": ""
			};

			expect(props.getProductItemFullDescription).toHaveBeenCalled();

			expect(component.state("darkScreen")).toBe(true);
			expect(component.state("modal")).toBe(true);
			expect(component.state("loading")).toBe(true);
			expect(component.state("error")).toBe(null);
			expect(component.state("showContent")).toBe(false);

			expect(component.state("fullDescription")).toEqual({}); // ??
			expect(component.state("alreadyInCart")).toBe(false); // ??

			expect(component.state("imageNumber")).toBe(0);
			expect(component.state("imageAmount")).toBe(0);
			expect(component.state("classNames")).toEqual(classNames);

			expect(Modal.prototype.animationStateMachine).toHaveBeenCalledWith("start");
			Modal.prototype.animationStateMachine.mockRestore();

			expect(Modal.prototype.classNamesSelector).toHaveBeenCalledTimes(1);
			Modal.prototype.classNamesSelector.mockRestore();
		});

		it("Start animation", () => {
			//
		});
	});

	// expect(sum(1, 2)).toBe(3);
});
