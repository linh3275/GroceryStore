
import React from "react";
import { useAuth } from "../../components/hooks/auth";
import classes from './Dashboard.module.css';
import { Link } from "react-router-dom";
import { ProfileIcon, PeopleIcon, CategoryIcon, ShippingIcon } from '../../components/icon';

export default function Dashboard() {
    const {user} = useAuth();

    return (
        <div className={classes.container}>
            <div className={classes.navbar}>
                {allItems.filter(item => user.isAdmin || !item.forAdmin)
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
        icon: <ProfileIcon />
    },
    {
        title: 'Accounts',
        url: '/admin/users',
        icon: <PeopleIcon />
    },
    {
        title: 'Products',
        url: '/admin/products',
        icon: <CategoryIcon />
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: <ShippingIcon />
    },
]