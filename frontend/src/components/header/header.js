import { Link } from 'react-router-dom';
import classes from './header.module.css';
import { CartIcon } from '../icon';
import Search from '../Search/search';
import { useCart } from '../hooks/cart';
import { useAuth } from '../hooks/auth';

export default function Header() {
  
  const { user, logout } = useAuth();

  const {cart} = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Dream Market
        </Link>

        <div className={classes.search}>
          <Search />
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/cart" className={classes.cart}>
                <CartIcon sx={{fontSize: 25}}/>
                {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span> }
              </Link>
            </li>

            {
              user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Log Out</a>
                </div>
              </li>
              ) : (
              <Link to="/login">Log In</Link>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}
