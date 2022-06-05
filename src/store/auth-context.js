import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    refreshToken: "",
    isLoggedIn: false,
    login: (token, refreshToken) => {},
    logout: () => {},
});

const retriveToken = () => {
    // Used for persisten logged in
    const token = localStorage.getItem("token");

    // TODO: Check how to validate that the current token is not expired
    // and how to check that the token is valid
    // TODO: Add ExpiryDate from token
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
        return null;
    }

    return {
        token,
        refreshToken,
    };
};

export const AuthContextProvider = ({ children }) => {
    const tokenData = retriveToken();
    const [token, setToken] = useState(tokenData?.token);
    const [refreshToken, setRefreshToken] = useState(tokenData?.refreshToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, refreshToken) => {
        setToken(token);
        setRefreshToken(refreshToken);

        // TODO: This is basic storage, can research for more secure way
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    const contextValue = {
        token,
        refreshToken,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
