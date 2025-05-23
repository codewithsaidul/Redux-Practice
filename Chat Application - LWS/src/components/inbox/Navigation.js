import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth) || {};

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        localStorage.clear()
    }
    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/">
                        <img
                            className="h-10"
                            src={logoImage}
                            alt="Learn with Sumit"
                        />
                    </Link>
                    <ul className="flex justify-center items-center gap-2 pr-5">
                        <li  className="text-white">
                            <span className="cursor-pointer">{user?.name}</span>
                        </li>
                        <li onClick={handleLogOut} className="text-white">
                            <span className="cursor-pointer">Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
