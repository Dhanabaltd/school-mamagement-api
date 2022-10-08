import clsx from "clsx";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import image from './osLogo.png';

import './style.css'

import { useStyles } from "./styles";

export const NavBarTop = ({ open, onDrawerOpen }) => {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })}
        >
            <Toolbar>
                <MenuIcon
                    style={{ cursor: 'pointer' }}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open
                    })}
                >
                    <MenuIcon />
                </MenuIcon>
                <img src={image} className="logo" alt="fireSpot" />
                <Typography variant="h6" noWrap>
                    Ocean School
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
