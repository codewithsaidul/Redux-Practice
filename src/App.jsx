import { Provider } from "react-redux";
import MainCounter from "./pages/Counter/MainCounter";
import store from "./rtk/app/store";

function App() {
  return (
    <Provider store={store}>
      <MainCounter />
    </Provider>
  );
}

export default App;
