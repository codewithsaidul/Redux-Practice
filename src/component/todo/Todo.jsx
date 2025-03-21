import { useDispatch } from "react-redux";
import todoDeleted from "../../redux/SimpleTodo/todo/thunk/deleteTodo";
import updateColor from "../../redux/SimpleTodo/todo/thunk/updateColor";
import updateStatus from "../../redux/SimpleTodo/todo/thunk/updateStatus";


export default function Todo({ todo }) {
  const dispatch = useDispatch();

  const { text, id, completed, color } = todo;

  const handleStatusChange = (todoId, currentStatus) => {
    dispatch(updateStatus(todoId, currentStatus));
  };

  const handleColorChange = (todoId, color) => {
    dispatch(updateColor(todoId, color));
  };

  const handleDelete = (todoId) => {
    dispatch(todoDeleted(todoId));
  };

  return (
    <div className="flex border-b border-gray-400/20 justify-start p-2 hover:bg-gray-100 hover:transition-all items-center last:border-0 space-x-4">
      <div
        className={`rounded-full relative bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(id, completed)}
          className="rounded-full absolute opacity-0"
        />
        {completed && (
          <svg
            className="h-3 text-green-500 w-3 fill-current pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 ${completed && "line-through"}`}>
        {text}
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColorChange(id, "green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange(id, "yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColorChange(id, "red")}
      ></div>

      <img
        src="/images/cancel.png"
        className="flex-shrink-0 h-4 w-4 cursor-pointer ml-2"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
}
