import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    refreshToken: "",
    isLoggedIn: false,
    login: (token, refreshToken) => {},
    logout: () => {},
    retryToken: async () => {},
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

    const retryTokenHandler = async () => {
        const result = await fetch(
            `http://localhost:8088/api/auth/refreshtoken`,
            {
                method: "POST",
                body: JSON.stringify({ refreshToken }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await result.json();

        if (!result.ok) {
            console.error(data);
            logoutHandler();
            return false;
        }

        console.log("Refresh token");
        const { accessToken, newRefreshToken } = data;
        loginHandler(accessToken, newRefreshToken);
        return true;
    };

    const contextValue = {
        token,
        refreshToken,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        retryToken: retryTokenHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// For reference look at https://kentcdodds.com/blog/how-to-use-react-context-effectively#the-custom-consumer-hook
export const useAuthCtx = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthCtx must be used within a AuthContextProvider");
    }

    return context;
};
