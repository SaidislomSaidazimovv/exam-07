import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import routes from "../../../router/routes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import clothesLogo from "../../../assets/clothes----logo.jpg";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import {
  Menu,
  MenuItem,
  Tooltip,
  IconButton as MUIIconButton,
  Avatar,
} from "@mui/material";
import { Logout, PersonAdd } from "@mui/icons-material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const currentRoute = routes.find((route) => route.path === pathname);

  const drawer = (
    <div>
      <Toolbar>
        <img
          src={clothesLogo}
          alt="logo"
          style={{
            width: "200px",
            height: "115px",
            margin: "auto",
          }}
        />
      </Toolbar>
      <Divider />
      <List>
        {routes?.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={item.path === pathname ? "block bg-blue text-white" : ""}
            style={{
              textDecoration: "none",
              color: item.path === pathname ? "white" : "inherit",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: item.path === pathname ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.content} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {currentRoute ? currentRoute.content : "Responsive drawer"}
          </Typography>
          <Tooltip title="Account settings">
            <MUIIconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar sx={{ width: 35 , height: 35 }}>S</Avatar>
            </MUIIconButton>
          </Tooltip>
          <Menu
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
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
            <PersonOutlinedIcon sx={{ width: 22, height: 22 }}/>
            <h1 className="mx-3">Profile</h1>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <AccountCircleOutlinedIcon sx={{ width: 22, height: 22 }}/>
            <h1 className="mx-3">My account</h1>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <PersonAddOutlinedIcon sx={{ width: 22, height: 22 }}/>
            <h1 className="mx-3">Add another account</h1>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <SettingsOutlinedIcon sx={{ width: 22, height: 22 }}/>
            <h1 className="mx-3">Setting</h1>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
            <LogoutOutlinedIcon sx={{ width: 22, height: 22 }}/>
            <h1 className="mx-3">Logout</h1>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
