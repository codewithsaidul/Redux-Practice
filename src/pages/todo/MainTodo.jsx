import React from "react";
import { Helmet } from "react-helmet-async";
import TodoFooter from "../../component/todo/TodoFooter";
import TodoHeader from "../../component/todo/TodoHeader";
import TodoList from "../../component/todo/TodoList";
const MainTodo = () => {
  return (
    <div>
        <Helmet>
            <title>Todo | Redux Fundamental Example</title>
        </Helmet>

        <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
          {/* <!-- navbar --> */}
          <div className="fixed top-0 left-0 text-center w-full header bg-violet-600 py-4 text-white font-bold text-lg shadow-lg">
            Simple Todo Application with Redux
          </div>

          <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {/* <!-- header --> */}
            <TodoHeader />
            <hr className="mt-4" />
            {/* <!-- todo list --> */}
            <TodoList />
            <hr className="mt-4" />
            {/* <!-- footer --> */}
            <TodoFooter />
          </div>
        </div>
    </div>
  );
};

export default MainTodo;
