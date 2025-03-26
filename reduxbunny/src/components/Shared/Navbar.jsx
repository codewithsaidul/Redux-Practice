import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { searched } from "../../redux/features/filters/filtersSlice";


const Navbar = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState("");
  const navigate = useNavigate()
  const match = useMatch("/")


  console.log(match)

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(searched(input))
    setInput("")

    if (!match) {
      navigate("/")
    }
  }



  return (
    <header>
      <nav className="bg-slate-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 flex justify-between py-3">
          <a href="/">
            <img className="h-10" src="/assets/lws.svg" alt="Learn with Sumit" />
          </a>
          <div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
            {/* <!-- search --> */}
            <form onSubmit={handleSubmit}>
              <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
            <img
              className="inline h-4 cursor-pointer"
              src="/assets/search.svg"
              alt="Search"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
