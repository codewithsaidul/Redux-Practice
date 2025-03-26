import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import SingleVideo from "../pages/SingleVideo";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/video/:videoId",
                element: <SingleVideo />
            }
        ]
    }
])


export default router