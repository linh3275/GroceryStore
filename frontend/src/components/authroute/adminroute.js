import React from 'react';
import { useAuth } from '../hooks/auth';

import AuthRoute from './authroute';

import NotFound from '../notfound/notfound';
 
function AdminRoute({children}) {
    
    const {user} = useAuth();

  return user.isAdmin ? children :
    <NotFound
        linkRoute="/"
        linkText="Về trang Chủ !"
        message="Bạn không có quyền truy cập vào trang này !"
    />
}

const AdminRouteExport = ({children}) => (
    <AuthRoute>
        <AdminRoute>{children}</AdminRoute>
    </AuthRoute>
);

export default AdminRouteExport;