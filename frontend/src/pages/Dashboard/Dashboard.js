import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../components/hooks/auth";
import { ProfileIcon, PeopleIcon, CategoryIcon, ShippingIcon } from '../../components/icon';

import classes from './Dashboard.module.css';

export default function Dashboard() {
    
    const {user} = useAuth();

    return (
        <div className={classes.container}>
            <div className={classes.navbar}>
                { allItems.filter(item => user.isAdmin || !item.forAdmin)
                    .map(item => 
                        <Link key={item.title} to={item.url} >
                            {item.icon}
                            <h2>{item.title}</h2>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

const allItems = [
    {
        title: 'Profile',
        url: '/profile',
        icon: <ProfileIcon />,
    },
    {
        title: 'Accounts',
        url: '/admin/users',
        icon: <PeopleIcon />,
        forAdmin: true,
    },
    {
        title: 'Products',
        url: '/admin/products',
        icon: <CategoryIcon />,
        forAdmin: true,
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: <ShippingIcon />,
    },
]