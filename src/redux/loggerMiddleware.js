import rootReducer from "./rootReducer";
import store from "./store";

const myLogger = (state) => (next) => (action) => {
  console.log(`Actions : ${JSON.stringify(action)}`);
  console.log(`Before Action : ${JSON.stringify(state.getState())}`);

  const upComingState = [action].reduce(rootReducer, store.getState());
  console.log(`After Action : ${JSON.stringify(upComingState)}`);
  // pass action
  return next(action);
};

export default myLogger;
