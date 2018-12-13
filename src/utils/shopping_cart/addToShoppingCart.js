const add = (productId, cookies) => {
	let prevCart = cookies.get("shopping-list") || [];

	if (!Array.isArray(prevCart)) {
		cookies.remove("shopping-list", { path: "/" });
		cookies.set("shopping-list", [productId], { path: "/" });
	} else {
		cookies.set("shopping-list", [...prevCart, productId], { path: "/" });
	}
};

export default add;
