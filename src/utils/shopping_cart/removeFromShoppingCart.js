const remove = (productID, cookies) => {
	let prevCart = cookies.get("shopping-list") || [];

	if (!Array.isArray(prevCart)) {
		cookies.remove("shopping-list", { path: "/" });
	} else {
		prevCart = prevCart.filter(id => id !== productID);

		cookies.set("shopping-list", [...prevCart], { path: "/" });

		if (!prevCart.length) {
			cookies.remove("shopping-list", { path: "/" });
		}
	}
};

export default remove;
