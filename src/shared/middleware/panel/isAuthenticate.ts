import Cookies from "js-cookie";
export const isAuthenticate = () => {
    return Boolean(Cookies.get('tokenp'));
};