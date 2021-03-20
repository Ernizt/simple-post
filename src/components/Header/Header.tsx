import React from 'react';
import {Avatar, ListItemText, makeStyles} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {blue} from "@material-ui/core/colors";
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const classes = useStyles();
    return <>
            { props.isAuth
                ? <div>
                    <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                    <ListItemText primary={ props.login} />

                                        <button onClick={props.logout}>Log out</button> </div>
                : '' }
         </>
}

export default Header;
