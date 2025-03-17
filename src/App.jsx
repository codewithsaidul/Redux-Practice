import { Provider } from "react-redux";
import MainTodo from "./pages/todo/MainTodo";
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
        <MainTodo />
    </Provider>
  );
}

export default App;
