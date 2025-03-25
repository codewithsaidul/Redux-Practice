import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import VideoDescription from "../pages/VideoDescription";



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
                element: <VideoDescription />
            }
        ]
    }
])


export default router