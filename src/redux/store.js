import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";
import myLogger from "./loggerMiddleware";
import logger from "redux-logger";





const store = createStore(
  rootReducer,
  applyMiddleware(logger, myLogger),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
