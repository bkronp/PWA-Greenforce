import { Reducer } from "redux";

// Import Own Components
import alertReducer    from "~/Components/Alert/store/reducer";
import dialogReducer   from "~/Components/Dialog/store/reducer";
import userReducer     from "./UserStore/reducer";
import combineReducers from "./combineReducers";

const reducers: Reducer = combineReducers({
	alertReducer,
	dialogReducer,
	userReducer,
});

export default reducers;
