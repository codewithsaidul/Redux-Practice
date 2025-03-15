import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";



const logger = (state) => (next) => (action) => {
  console.log(`Actions : ${JSON.stringify(action)}`);
  console.log(`Before Action : ${JSON.stringify(state.getState())}`)

  // pass action
  return next(action)
}

const store = createStore(
  rootReducer,
  applyMiddleware(logger),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
