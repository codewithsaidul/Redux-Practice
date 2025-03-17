import { useDispatch, useSelector } from "react-redux";
import { statusChanged } from "../../redux/SimpleTodo/filter/action";

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

const TodoFooter = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.todoFilter);
  const dispatch = useDispatch();
  const todosRemaining = todos.filter((todo) => !todo.completed).length;

  const handleStatusChanged = (stats) => {
    dispatch(statusChanged(stats));
  };

  console.log(filter)

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
        <li className="h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer bg-green-500"></li>
        <li className="h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer"></li>
        <li className="h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer"></li>
      </ul>
    </div>
  );
};

export default TodoFooter;
