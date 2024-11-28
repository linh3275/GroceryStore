import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { block, getAllU } from '../../../services/userservice';
import { useAuth } from '../../../components/hooks/auth';

import Title from '../../../components/HTML_DOM/title';
import Search from '../../../components/Search/search';
import Button from '../../../components/HTML_DOM/button';

import { CheckIcon, CrossIcon } from '../../../components/icon';

import classes from './userM.module.css';

export default function UserManagement() {

    const [users, setUsers] = useState();
    const {searchTerm} = useParams();
    const auth = useAuth();

    const navigate = useNavigate();
    
    const handleToggleBlock = async (userId) => {
        const isBlocked = await block(userId);
        
        setUsers(oldUsers => oldUsers.map(user => user.id === userId? {...user, isBlocked} : user))
    }
    
    useEffect(() => {
        const loadUsers = async () => {
            try {
            const users = await getAllU(searchTerm);
            setUsers(users);
            } catch (error) {
                if (error.response?.status === 401) {
                    alert('Bạn cần đăng nhập lại.');
                    navigate('/login');
                } else {
                    alert('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
                }
            }
        };

        loadUsers();
    }, [searchTerm, navigate]);


  return (
    <div className={classes.container}>
        <div className={classes.list}>

            <div className={classes.head}>
                <Title title="Quản lý người dùng" />
                
                <Button type="button" text="Trở về" backgroundColor="var(--patone-green)"
                    onClick={() => navigate('/dashboard')} />
            </div>

            <Search
                searchRoute="/admin/users"
                defaultRoute="/admin/users"
            />

            <div className={classes.list_item}>
                <h3>Tên người dùng</h3>
                <h3>Tên tài khoản Email</h3>
                <h3>Địa chỉ</h3>
                <h3>Quyền hành</h3>
                <h3>Điều chỉnh</h3>
            </div>

            {
                users && users.map(user => 
                    <div key={user.id} className={classes.list_item}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span className={classes.address}>{user.address}</span>
                        <span>{user.isAdmin ? 
                                <div className={classes.auth}> Admin <CheckIcon /> </div>
                                :
                                <div className={classes.auth}> Admin <CrossIcon sx={{ color: 'var(--rouge-red)' }} /> </div> }
                        </span>

                        <span className={classes.actions}>
                            <Link to={'/admin/editUser/' + user.id}>Chỉnh sửa</Link>
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
