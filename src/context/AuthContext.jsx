import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import {isTokenValid} from "../helpers/isTokenValid";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            console.log('Opgeslagen token:', token);
            console.log('Context wordt gerefresht!');

            if (token && isTokenValid(token)) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    const userData = await axios.get (`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
                        headers: {
                            'novi-education-project-id': 'c5a4b4d1-3095-4ef9-a5e3-a07a267533c6',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setAuthState({
                        isAuth: true,
                        user: {
                            id: userData.data.id,
                            email: userData.data.email,
                            roles: userData.data.roles,
                        },
                        status: 'done',
                    })
                    console.log(userData);
                } catch (error) {
                    setAuthState({
                        ...authState,
                        isAuth: false,
                        user: null,
                        status: 'done',
                    })
                    console.log(error);
                }
            }else {
                setAuthState({
                    ...authState,
                    isAuth: false,
                    user: null,
                    status: 'done',
                })
            }
        }
        fetchUser();

    }, []);



    async function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log(`UserID: ${userId}`);
        const userData = await axios.get (`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
            headers: {
                'novi-education-project-id': 'c5a4b4d1-3095-4ef9-a5e3-a07a267533c6',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('UserData: ', userData);
        setAuthState({
            ...authState,
            isAuth: true,
            user: {
                id: userData.data.id,
                email: userData.data.email,
                roles: userData.data.roles,
            },
        });
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }
    function logout() {
        localStorage.removeItem('token');
        setAuthState({
            ...authState,
            isAuth: false,
            user: null,
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
            {authState.status === 'done' ?  children : 'loading'}
        </AuthContext.Provider>
    )

}



