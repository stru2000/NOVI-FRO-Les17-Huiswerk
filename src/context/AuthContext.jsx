import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});


export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({isAuth: false, user: ''});
    const navigate = useNavigate();

    function login(email) {
        setAuthState({
            ...authState,
            isAuth: true,
            user: email,
        });
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }
    function logout() {
        setAuthState({
            ...authState,
            isAuth: false,
            user: '',
        });
        console.log("Gebruiker is UITGELOGD!");
        navigate("/");
    }
    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}



