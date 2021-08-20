import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import popUpReducer from "./popUpReducer";
import postListReducer from "./postListReducer";
import userReducer from "./userReducer";
import userPostReducer from "./userPostReducer";

const rootReducer = combineReducers({
    loginReducer,
    popUpReducer,
    postListReducer,
    userReducer,
    userPostReducer,
});

export default rootReducer;
