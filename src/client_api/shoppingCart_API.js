import axios from "axios";

class ShoppingCart {
	static getShoppingList() {
		return axios({
			method: "post",
			url: "/api/shopping-cart/get-shopping-list",
			timeout: 5000
		});
	}

	static async sendShoppingCartForm({ info }) {
		const { TELEGRAM_TOKEN } = process.env;
		const { TELEGRAM_GROUP_CHAT_ID } = process.env;

		let response;

		try {
			response = await axios({
				method: "get",
				timeout: 5000,
				url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_GROUP_CHAT_ID}&parse_mode=html&text=${info}`
			});

			return {
				message: "Ваш заказ оформлен! Спасибо за покупку!",
				ok: response.data.ok
			};
		} catch (error) {
			return {
				message: "Ошибка! Попробуйте еще раз!",
				ok: false,
				errorCode: error.response.data.error_code
			};
		}
	}
}

export default ShoppingCart;
