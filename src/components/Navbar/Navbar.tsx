import React, {useState} from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Button, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const Navbar: React.FC = () => {
    const [openMenu, setMenu] = useState(null)
    const changeMenu = (event:any) => {
        setMenu(event.currentTarget)
    }
    const changeMenuClose = (event:any) => {
        setMenu(null)
    }
    return (<>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={changeMenu}>
            <MenuIcon />
        </Button>

    <Menu
        anchorEl={openMenu}
        id="simple-menu"
        keepMounted
        open={Boolean(openMenu)}
        onClose={changeMenuClose}
    >

        <MenuItem onClick={changeMenuClose}><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></MenuItem>
        <MenuItem onClick={changeMenuClose}><NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink></MenuItem>
        <MenuItem onClick={changeMenuClose}><NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink></MenuItem>
        <MenuItem onClick={changeMenuClose}><NavLink to="/chat" activeClassName={s.activeLink}>Chat</NavLink></MenuItem>
    </Menu>

        {/*<nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>

            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
        </nav>*/}
        </>
    )
}

export default Navbar;
