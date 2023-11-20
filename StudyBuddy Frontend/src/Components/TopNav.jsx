import * as React from "react";
import {
  IconButton,
  AppBar,
  Box,
  Typography,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { token } from "../Constants/Vars";

export default function TopNav() {
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [user, setUser] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  React.useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setSignedIn(true);
    }
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {signedIn ? (
        <Box>
          {/* <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
            Profile
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              handleMenuClose();
              localStorage.clear();
              nav("/");
              window.location.reload();
            }}
          >
            Log out
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem
            onClick={() => {
              nav("/login");
              handleMenuClose();
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              nav("/signup");
              handleMenuClose();
            }}
          >
            Signup
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {signedIn ? (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            localStorage.clear();
            nav("/");
            window.location.reload();
          }}
        >
          Log out
        </MenuItem>
      ) : (
        <Box>
          <MenuItem
            onClick={() => {
              nav("/login");
              handleMenuClose();
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              nav("/signup");
              handleMenuClose();
            }}
          >
            Signup
          </MenuItem>
        </Box>
      )}

      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <Typography variant="span">Profile</Typography>
      </MenuItem> */}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, px: 2, py: 2 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", color: "#000", px: 0, boxShadow: "none" }}
      >
        <Toolbar sx={{ p: 0 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            noWrap
            component="div"
            sx={{
              display: "flex",
              cursor: "pointer",
            }}
            onClick={() => nav("/")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
              width={30}
              alt=""
              style={{ transform: "rotateY(180deg)", marginRight: "5px" }}
            />
            <span style={{ color: "red", fontSize: "1.6rem" }}>S</span>tuddy
            <span style={{ color: "red", fontSize: "1.6rem" }}>B</span>udy
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {signedIn && user.role == "admin" ? (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => nav("/materials/admin")}
              >
                <NotificationsIcon />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {signedIn && user.role == "admin" ? (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => nav("/materials/admin")}
              >
                <NotificationsIcon />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <hr />
    </Box>
  );
}
