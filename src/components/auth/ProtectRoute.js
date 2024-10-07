import React, { Fragment, useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { Navigate, useNavigate } from 'react-router-dom';


const ProtectRoute = ({ children }) => {
    const [hasCookies, setHasCookies] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {

        const CheckLogin = async () => {
            try {
                const getCookies = Cookies.get('user_login')
                getCookies ? setHasCookies(true) : navigate('/')
            } catch (error) {
                console.log('Auth Error', error)
            }
        }
        CheckLogin()

    }, [])
    return (
        hasCookies && children
    )
}

export default ProtectRoute