import { combineReducers } from "redux";
import modalShoppingCartReducer from "./modalShoppingCartReducer";
import productItemListReducer from "./productItemListReducer";
import navLinksReducer from "./navLinksReducer";
import productItemReducer from "./productItemReducer";
import applicationSettingsReducer from "./applicationSettingsReducer";

export default combineReducers({
	// под именем modalShoppingCart редьюсер будет доступен в компонентах (store.modalShoppingCart)
	navLinks: navLinksReducer,
	modalShoppingCart: modalShoppingCartReducer,
	productItemList: productItemListReducer,
	productItem: productItemReducer,
	applicationSettings: applicationSettingsReducer
});
