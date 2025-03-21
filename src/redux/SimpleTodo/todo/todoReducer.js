import {
  ADDED,
  ALLCLEAR,
  ALLCOMPLETED,
  COLORSELECTED,
  DELETED,
  LOADED,
  TOGGLED,
} from "./actionTypes";
import { initialState } from "./initialState";

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return action.payload
    case ADDED:
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload
        },
      ];
    case TOGGLED:
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case COLORSELECTED: {
      const { todoId, todoColor } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          color: todoColor,
        };
      });
    }
    case DELETED:
      return state.filter((todo) => todo.id !== action.payload);
    case ALLCOMPLETED:
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });
    case ALLCLEAR:
      return state.map((todo) => !todo.completed);
    default:
      return state;
  }
};



export default todoReducer
