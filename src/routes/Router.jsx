import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import DonationRequest from "../pages/DonationRequest";
import DonationDetails from "../pages/DonationDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Overview";
import Profile from "../pages/Profile";
import MyRequests from "../pages/MyRequests";
import CreateRequest from "../pages/CreateRequest";
import AllUsers from "../pages/AllUsers";
import AllRequests from "../pages/AllRequests";
import Funding from "../pages/Funding";



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
            {
                path: 'donation-request/:id',
                element:
                    <PrivateRoute>
                        <DonationDetails></DonationDetails>
                    </PrivateRoute>
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

    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,  // <-- this will render by default for /dashboard
                element: <Overview />
            },
            { path: 'overview', element: <Overview /> },
            { path: 'profile', element: <Profile /> },
            { path: 'my-requests', element: <MyRequests /> },
            { path: 'create-request', element: <CreateRequest /> },
            { path: 'all-users', element: <AllUsers /> },       // admin only
            { path: 'all-requests', element: <AllRequests /> }, // admin only
            { path: 'funding', element: <Funding /> },          // admin only
        ],
    },

])

export default router;