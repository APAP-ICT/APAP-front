import {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route, Navigate, Outlet} from 'react-router-dom';
import './styles.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './MainContent';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Statistics from './pages/Statistics/Statistics';
import History from './pages/HistoryRecord/HistoryRecord';
import CameraManagement from './pages/CameraManagement/CameraManagement';
import Report from './pages/Report/Report';
import ObjectDetectResult from './pages/ObjectDetectResultList/ObjectDetectResult';
import ImageUploader from './pages/ImageUploader/ImageUploader';
import Publisher from './pages/Publisher';
import Subscriber from './pages/Subscriber';
import requestPermission from "./push-notification.js";
import {registerServiceWorker} from "../public/register-sw.js";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
        requestPermission()
        registerServiceWorker()
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage onLogin={handleLogin}/>
        },
        {
            path: "/signup",
            element: <SignupPage/>
        },
        {
            path: "/",
            element: isAuthenticated ? (
                <>
                    <Sidebar/>
                    <div className="main-content">
                        <Header onLogout={handleLogout}/>
                        <Outlet/>
                    </div>
                </>
            ) : <Navigate to="/login"/>,
            children: [
                {path: "", element: <MainContent/>},
                {path: "dashboard", element: <Dashboard/>},
                {path: "statistics", element: <Statistics/>},
                {path: "history", element: <History/>},
                {path: "camera-management", element: <CameraManagement/>},
                {path: "report", element: <Report/>},
                // 하위는 임시 메뉴
                {path: "object-detect", element: <ObjectDetectResult/>},
                {path: "upload", element: <ImageUploader/>},
                {path: "publisher", element: <Publisher/>},
                {path: "subscriber", element: <Subscriber/>},
                {path: "*", element: <Navigate to="/"/>}
            ]
        },
        {path: "*", element: <Navigate to={isAuthenticated ? "/" : "/login"}/>}
    ]);

    return (
        <RouterProvider router={router}/>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
);
