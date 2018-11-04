import { combineReducers } from "redux"
import uberReducer from "./uberReducer";
import lyftReducer from "./lyftReducer";

export default combineReducers({
	uber: uberReducer,
	lyft:lyftReducer
})