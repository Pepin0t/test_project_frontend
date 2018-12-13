const check = (productId, cookies) => {
	const shoppingList = cookies.get("shopping-list") || [];

	if (!Array.isArray(shoppingList)) {
		cookies.remove("shopping-list", { path: "/" });
		return false;
	}

	return shoppingList.indexOf(productId) !== -1;
};

export default check;
