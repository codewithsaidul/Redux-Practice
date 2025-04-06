import { combineReducers } from "redux";
import counterReducer from "./counter/counterReducer";
import dynamicReducer from "./dynamicCounter/dynamicReducer";
import filterReducer from "./SimpleTodo/filter/filterReducer";
import todoReducer from "./SimpleTodo/todo/todoReducer";


const rootReducer = combineReducers({
    counter: counterReducer,
    dynamic: dynamicReducer,
    todos: todoReducer,
    todoFilter: filterReducer
})


export default rootReducer