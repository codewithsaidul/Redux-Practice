import { loadTodo } from "../acion";




const fetchTodos = async (dispatch) => {
    const response = await fetch("http://localhost:9000/todos");
    const todos = await response.json();

    dispatch(loadTodo(todos))
}

export default fetchTodos