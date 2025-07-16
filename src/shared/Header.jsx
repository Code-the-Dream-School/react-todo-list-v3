import { NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

function Header() {
  const [title, setTitle] = useState('Todo List');
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Todo List');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else {
      setTitle('Not Found');
    }
  }, [location]);
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.current : styles.inactive
          }
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.current : styles.inactive
          }
          to={'/about'}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
