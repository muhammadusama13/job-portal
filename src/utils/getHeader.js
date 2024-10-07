import Cookies from 'js-cookie'
import getUserData from './getUserDate';


const getHeader = () => {
    let userData = getUserData()

    const header = {
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    return header;
}

export default getHeader