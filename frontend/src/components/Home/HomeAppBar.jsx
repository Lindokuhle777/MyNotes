import {
    Typography,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext } from "react";
import { HomeContext } from "./HomeContext";
import FolderIcon from "@mui/icons-material/Folder";
import { AuthContext } from "../../MainContext";
import {
    AppBar,
    Toolbar,
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function HomeAppBar({ currCollectionName }) {
    const { logOut, setUser, user, desktop } = useContext(AuthContext);
    const { handleOpenDrawer } = useContext(HomeContext);

    const [openMenu, setOpenMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfile = (e) => {
        e.preventDefault();
        alert("Feature coming soon...");
    }

    const handleLogout = async () => {
        try {
            await logOut();
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleClickOpenMenu = (event) => {
        setOpenMenu(true);
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position="sticky" style={{ backgroundColor: "#115571" }}>
            <Toolbar>
                {!desktop && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpenDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {desktop && 
                    <Avatar style={{ marginRight: "10px" }}>
                        <FolderIcon />
                    </Avatar>
                }


                <Typography variant='h5'>{currCollectionName}</Typography>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    edge="end"
                    style={{ position: 'absolute', right: 20 }}
                    onClick={handleClickOpenMenu}
                >
                    <Avatar >{user.name[0]}</Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={openMenu}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default HomeAppBar