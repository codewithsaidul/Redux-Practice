import { combineReducers } from "redux";
import counterReducer from "./counter/counterReducer";
import dynamicReducer from "./dynamicCounter/dynamicReducer";


const rootReducer = combineReducers({
    counter: counterReducer,
    dynamic: dynamicReducer
})


export default rootReducer