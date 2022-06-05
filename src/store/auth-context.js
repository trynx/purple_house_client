import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, refreshToken) => {},
    logout: () => {},
});

const retriveToken = () => {
    // Used for persisten logged in
    const token = localStorage.getItem("token");
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

    const userIsLoggedIn = !!token;

    const loginHandler = (token, refreshToken) => {
        console.log(token, refreshToken);
        setToken(token);

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
