import React from 'react';
import { useAuth } from '../hooks/auth';
import NotFound from '../notfound/notfound';
import AuthRoute from './authroute';

function AdminRoute({children}) {
    
    const {user} = useAuth();

  return user.isAdmin ? children :
    <NotFound
        linkRoute="/dashbroard"
        linkText="Go to dashboard !"
        message="You don't have access to this page !"
    />
}

const AdminRouteExport = ({children}) => (
    <AuthRoute>
        <AdminRoute>{children}</AdminRoute>
    </AuthRoute>
);

export default AdminRouteExport;