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
            
            toast.success('Đăng nhập thành công !');
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success('Đăng xuất thành công !');
    }

    const register = async data => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success('Chào mừng khách hàng mới !');
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    const updateProfile = async user => {
        const updatedUser = await userService.updateProfile(user);
        toast.success('Cập nhật thông tin cá nhân thành công !');
        if (updatedUser) setUser(updatedUser);
    }

    const changePassword = async password => {
        await userService.changePassword(password);
        logout();
        toast.success('Đã đổi mật khẩu thành công. Vui lòng đăng nhập lại !');
    }

    return (
        <authContext.Provider value={{user, login, logout, register, updateProfile, changePassword}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);