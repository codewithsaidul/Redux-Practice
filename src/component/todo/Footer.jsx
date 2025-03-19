import { useDispatch, useSelector } from "react-redux";
import {
  colorChanged,
  statusChanged,
} from "../../redux/SimpleTodo/filter/action";

const todosTask = (noTodo) => {
  switch (noTodo) {
    case 0:
      return "No task";
    case 1:
      return "1 Task";
    default:
      return `${noTodo} Tasks`;
  }
};

const Footer = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.todoFilter);
  const dispatch = useDispatch();
  const todosRemaining = todos.filter((todo) => !todo.completed).length;

  const handleStatusChanged = (stats) => {
    dispatch(statusChanged(stats));
  };

  const handleColorChanged = (color) => {
    if (filter.colors.includes(color)) {
      dispatch(colorChanged(color, "removed"));
    } else {
      dispatch(colorChanged(color, "added"));
    }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{todosTask(todosRemaining)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          onClick={() => handleStatusChanged("All")}
          className={`cursor-pointer ${filter.status === "All" && "font-bold"}`}
        >
          All
        </li>
        <li>|</li>
        <li
          onClick={() => handleStatusChanged("Incomplete")}
          className={`cursor-pointer ${filter.status === "Incomplete" && "font-bold"}`}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          onClick={() => handleStatusChanged("Complete")}
          className={`cursor-pointer ${filter.status === "Complete" && "font-bold"}`}
        >
          Complete
        </li>
        <li></li>
        <li></li>

        <li onClick={() => handleColorChanged("green")} className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${filter.colors.includes("green") && "bg-green-500"}`}></li>
        <li onClick={() => handleColorChanged("red")} className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${filter.colors.includes("red") && "bg-red-500"}`}></li>
        <li onClick={() => handleColorChanged("yellow")} className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${filter.colors.includes("yellow") && "bg-yellow-500"}`}></li>
      </ul>
    </div>
  );
};

export default Footer;
