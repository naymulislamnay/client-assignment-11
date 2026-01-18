import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import LogIn from "../pages/LogIn";
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
import About from "../pages/About";
import Mission from "../pages/Mission";
import Contact from "../pages/Contact";
import Team from "../pages/Team";
import Stories from "../pages/Stories";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import FAQ from "../pages/FAQ";
import Sitemap from "../pages/Sitemap";
import Accessibility from "../pages/Accessibility";
import Cookies from "../pages/Cookies";



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
            // Company pages
            {
                path: 'about',
                element: <About></About>
            },
            {
                path: 'mission',
                element: <Mission></Mission>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            },
            {
                path: 'team',
                element: <Team></Team>
            },
            // Service pages
            {
                path: 'stories',
                element: <Stories></Stories>
            },
            // Legal pages
            {
                path: 'privacy',
                element: <Privacy></Privacy>
            },
            {
                path: 'terms',
                element: <Terms></Terms>
            },
            {
                path: 'faq',
                element: <FAQ></FAQ>
            },
            {
                path: 'sitemap',
                element: <Sitemap></Sitemap>
            },
            {
                path: 'accessibility',
                element: <Accessibility></Accessibility>
            },
            {
                path: 'cookies',
                element: <Cookies></Cookies>
            }
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
            { path: 'all-users', element: <AllUsers /> },
            { path: 'all-requests', element: <AllRequests /> },
            { path: 'funding', element: <Funding /> },
        ],
    },

])

export default router;