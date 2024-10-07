import Cookie from "js-cookie"

const getUserData = () => {
    const userData = Cookie.get('user_login')
    const userParse = userData ? JSON.parse(userData) : null
    return userParse
}

export default getUserData