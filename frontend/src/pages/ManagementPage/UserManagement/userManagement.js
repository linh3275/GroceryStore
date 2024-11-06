import React, { useEffect, useState } from 'react';
import classes from './userM.module.css';
import { Link, useParams } from 'react-router-dom';
import { block, getAllU } from '../../../services/userservice';
import Title from '../../../components/HTML_DOM/title';
import { useAuth } from '../../../components/hooks/auth';
import Search from '../../../components/Search/search';

export default function UserManagement() {

    const [users, setUsers] = useState();
    const {searchTerm} = useParams();
    const auth = useAuth();

    const loadUsers = async () => {
        const users = await getAllU(searchTerm);
        setUsers(users);
    }

    const handleToggleBlock = async (userId) => {
        const isBlocked = await block(userId);

        setUsers(oldUsers => oldUsers.map(user => user.id === userId? {...user, isBlocked} : user))
    }

    useEffect(() => {
        loadUsers();
    }, [searchTerm]);

  return (
    <div className={classes.container}>
        <div className={classes.list}>
            <Title title="Manage Users" />

            <Search
                searchRoute="/admin/users"
                defaultRoute="/admin/users"
            />

            <div className={classes.list_item}>
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>Address</h3>
                <h3>Admin</h3>
                <h3>Action</h3>
            </div>

            {
                users && users.map(user => 
                    <div key={user.id} className={classes.list_item}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.address}</span>
                        <span>{user.isAdmin ? '' : ''}</span>

                        <span className={classes.actions}>
                            <Link to={'/admin/editUser/' + user.id}>Edit</Link>
                            {
                                auth.user.id !== user.id && (
                                    <Link onClick={() => handleToggleBlock(user.id)}>
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </Link>
                                )
                            }
                        </span>
                    </div>
                )
            }

        </div>
    </div>
  )
}
