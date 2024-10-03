import { useState, createContext, useContext } from "react";
import * as userService from "../../services/userservice";
import { toast } from "react-toastify";

const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getUser());

    const login = async (email, password) => {
        try {
            const user = await userService.login(email, password);
            setUser(user);
            toast.success('Login Successful !');
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success('Logout Successful !');
    }

    const register = async data => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success('Welcome New Buyer !');
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
        <authContext.Provider value={{user, login, logout, register}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);