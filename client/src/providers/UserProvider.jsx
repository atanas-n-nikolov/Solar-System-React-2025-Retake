import { UserContext } from "../context/UserContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function UserProvider({ children }) {
    const [authData, setAuthData] = useLocalStorageState('auth', {});

    const userLoginHandler = (resultData) => {

        const { email, _id, accessToken } = resultData;

        const minimalData = { email, _id, accessToken };
        setAuthData(minimalData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    const isAuthenticated = !!authData?.accessToken;

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}
