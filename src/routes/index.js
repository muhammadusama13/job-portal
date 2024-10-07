import React from 'react'
import Login from '../pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from '../pages/Signup';
import JobPage from '../pages/Job';
import ProtectRoute from '../components/auth/ProtectRoute';


const Index = () => {


    // const cookie = { name: 'Usama' }
    // Cookies.set('auth_cookies', JSON.stringify(cookie))
    // const checkCookies = Cookies.get('auth_cookies')
    // console.log(JSON.parse(checkCookies))
    // const auth_paths = ['/login', '/signup']

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/job" element={
                        <ProtectRoute>

                            <JobPage />
                        </ProtectRoute>

                    } />
                    {/* <ProtectRoute path="/job" element={<JobPage />} /> */}
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default Index