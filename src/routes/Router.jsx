import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import DonationRequest from "../pages/DonationRequest";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Homepage></Homepage>
            },
            {
                path: 'donation-requests',
                element: <DonationRequest></DonationRequest>
            },
        ]
    },
    {
        path: 'login',
        element: <LogIn></LogIn>
    },
    {
        path: 'signup',
        element: <SignUp></SignUp>
    },

])

export default router;