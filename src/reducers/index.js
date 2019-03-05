import { combineReducers } from "redux";
import modalShoppingCartReducer from "./modalShoppingCartReducer";
import productItemListReducer from "./productItemListReducer";
import productItemReducer from "./productItemReducer";
import applicationSettingsReducer from "./applicationSettingsReducer";
import adminReducer from "./adminReducer";
import transitionsReducer from "./transitionsReducer";
import { connectRouter } from "connected-react-router";

export default history =>
	combineReducers({
		router: connectRouter(history),
		modalShoppingCart: modalShoppingCartReducer,
		productItemList: productItemListReducer,
		productItem: productItemReducer,
		applicationSettings: applicationSettingsReducer,
		admin: adminReducer,
		transitions: transitionsReducer
	});
