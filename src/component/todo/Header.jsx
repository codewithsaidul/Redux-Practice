import { useState } from "react";
import { useDispatch } from "react-redux";
import { allClear, allCompleted } from "../../redux/SimpleTodo/todo/acion";
import addTodoServer from "../../redux/SimpleTodo/todo/thunk/addTodo";

const Header = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  // add new todo
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTodoServer(input));
    setInput("");
  };

  // all completed handler
  const allCompletedHandler = () => {
    dispatch(allCompleted());
  };
  // all clear completed handler
  const allClearCompletedHandler = () => {
    dispatch(allClear());
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src="/images/notes.png" className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          value={input}
          onChange={inputChange}
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          type="submit"
          className="appearance-none w-8 h-8 bg-[url('./images/plus.png')] bg-no-repeat bg-contain"
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          onClick={allCompletedHandler}
          className="flex space-x-1 cursor-pointer"
        >
          <img
            className="w-4 h-4"
            src="./images/double-tick.png"
            alt="Complete"
          />
          <span>Complete All Tasks</span>
        </li>
        <li onClick={allClearCompletedHandler} className="cursor-pointer">
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
