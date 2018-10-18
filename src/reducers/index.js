import { combineReducers } from "redux";
import modalShoppingCartReducer from "./modalShoppingCartReducer";
import productItemListReducer from "./productItemListReducer";
import productItemReducer from "./productItemReducer";
import applicationSettingsReducer from "./applicationSettingsReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
	modalShoppingCart: modalShoppingCartReducer,
	productItemList: productItemListReducer,
	productItem: productItemReducer,
	applicationSettings: applicationSettingsReducer,
	admin: adminReducer
});
