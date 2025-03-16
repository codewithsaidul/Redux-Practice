import { Provider } from "react-redux";
import store from "./redux/store";
import MainTodo from "./pages/todo/MainTodo";


function App() {
  return (
    <Provider store={store}>
        <MainTodo />
    </Provider>
  );
}

export default App;
