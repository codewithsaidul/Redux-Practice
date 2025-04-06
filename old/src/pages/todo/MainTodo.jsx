import React from "react";
import Footer from "../../component/todo/Footer";
import Header from "../../component/todo/Header";
import Navbar from "../../component/todo/Navbar";
import TodoList from "../../component/todo/TodoList";


const MainTodo = () => {
  return (
    <div>
      {/* <Helmet>
        <title>Todo | Redux Fundamental Example</title>
      </Helmet> */}

      <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
        <Navbar />

        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          {/* <Header /> */}
          <Header />

          <hr className="mt-4" />

          <TodoList />

          <hr className="mt-4" />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainTodo;
