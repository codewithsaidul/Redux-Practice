import { deletedTodo } from "../acion";

const todoDeleted = (todoId) => {
  return async (dispatch) => {
    await fetch(`http://localhost:9000/todos/${todoId}`, {
        method: "DELETE",
    });

    dispatch(deletedTodo(todoId));
  };
};

export default todoDeleted;
