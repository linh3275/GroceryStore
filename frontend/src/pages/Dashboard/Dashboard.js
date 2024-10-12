
import React from "react";
import { useAuth } from "../../components/hooks/auth";
import classes from './Dashboard.module.css';
import { Link } from "react-router-dom";

export default function Dashboard() {
    const {user} = useAuth();
    
    return (
        <div className={classes.container}>
            <div className={classes.menu}>
                {allItems.filter(item => user.isAdmin || !item.forAdmin)
                .map(item => 
                        <Link to={item.url} style={{backgroundColor: item.bgColor, color: item.color}}>
                            <img src={item.imageUrl} alt={item.title} />
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
        imageUrl: '',
        url: '/profile',
        color: 'white',
        bgColor: 'red',
    },
    {
        title: 'Users',
        imageUrl: '',
        url: '/admin/users',
        color: 'white',
        bgColor: 'green',
    },
    {
        title: 'Product',
        imageUrl: '',
        url: '/admin/products',
        color: 'white',
        bgColor: 'blue',
    },
    {
        title: 'Orders',
        imageUrl: '',
        url: '/orders',
        color: 'white',
        bgColor: 'violet',
    },
]