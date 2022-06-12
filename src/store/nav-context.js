import React, { useContext, useState } from "react";

const NavContext = React.createContext({
    router: "",
    updateRouter: (router) => {},
});

const retriveRouter = () => {
    return localStorage.getItem("router") ?? "/candidates";
};

export const NavContentProvider = ({ children }) => {
    const [router, setRouter] = useState(() => retriveRouter());

    const routerHandler = (newRouter) => {
        if (!newRouter) return;

        localStorage.setItem("router", newRouter);
        setRouter(newRouter);
    };

    const contextValue = {
        router,
        updateRouter: routerHandler,
    };

    return (
        <NavContext.Provider value={contextValue}>
            {children}
        </NavContext.Provider>
    );
};

export const useNavCtx = () => {
    const context = useContext(NavContext);

    if (context === undefined) {
        throw new Error("useNavCtx must be used within a NavContextProvider");
    }

    return context;
};
