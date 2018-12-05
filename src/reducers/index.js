import { combineReducers } from "redux"
import uberReducer from "./uberReducer";
import lyftReducer from "./lyftReducer";
import userReducer from "./userReducer";

export default combineReducers({
	uber: uberReducer,
	lyft:lyftReducer,
	user:userReducer
})