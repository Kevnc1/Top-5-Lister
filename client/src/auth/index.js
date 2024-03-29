import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    FLAG_ERROR: "FLAG_ERROR",
    UNFLAG_ERROR: "UNFLAG_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        auth_error: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    auth_error: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    auth_error: null
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    auth_error: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    auth_error: null
                })
            }
            case AuthActionType.FLAG_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    auth_error: payload.auth_error
                })
            }
            case AuthActionType.UNFLAG_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    auth_error: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(err){
            console.error(err);
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err) {
            if (err.response){
                authReducer( {
                    type: AuthActionType.FLAG_ERROR,
                    payload: {
                        auth_error: err.response.data.errorMessage
                    }
                })
            }
            console.error(err);
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer( {
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
            else {
                console.log("Unauthorized");
            }
        }
        catch (err) {
            if (err.response){
                authReducer( {
                    type: AuthActionType.FLAG_ERROR,
                    payload: {
                        auth_error: err.response.data.errorMessage
                    }
                })
            }
            console.error(err);
        }
    }

    auth.logoutUser = async function() {
        try{
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                })
                history.push("/");
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    auth.unflagError = async function() {
        authReducer( {
            type: AuthActionType.UNFLAG_ERROR
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };