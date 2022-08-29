import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import popUpReducer from "./popUpReducer";
import postListReducer from "./postListReducer";
import userPostReducer from "./userPostReducer";

const rootReducer = combineReducers({
    loginReducer,
    popUpReducer,
    postListReducer,
    userPostReducer,
});

export default rootReducer;
