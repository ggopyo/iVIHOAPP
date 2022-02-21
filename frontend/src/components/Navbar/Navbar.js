import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Backdrop,
  Box,
  AppBar,
  Button,
  Fade,
  Modal,
  Typography,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import { AssignmentInd } from "@mui/icons-material";
import NotificationForm from "./NotificationForm";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/loginRedux";
import { selectOff } from "../../redux/selectedUserRedux";
import { Link } from "react-router-dom";
import SearchInputComponent from "../UpPart/SearchInputComponent";
import { useState } from "react";
const registrationStyle = {
  position: "absolute",
  top: "45%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 480,
  bgcolor: "background.paper",
  border: "solid 1px",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const loginStyle = {
  marginLeft: "710px",
  marginTop: "-50px",
  transform: "translate(50%, 50%)",
  width: 348,
  height: 220,
  bgcolor: "background.paper",
  border: "solid 1px gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const notificationStyle = {
  width: 238,
  height: 400,
  bgcolor: "background.paper",
  position: "absolute",
  top: "-22%",
  left: "268%",
  transform: "translate(50%, 50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar(props) {
  const { toggleFunc, searchInputInside, searchInputProps } = props;
  const { result, searchInputHandleSubmit } = searchInputProps;
  const currentUser = useSelector((state) => state.login.currentUser);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const registrationHandleOpen = () => {
    setRegistrationOpen(true);
  };
  const registrationHandleClose = () => setRegistrationOpen(false);
  const loginHandleOpen = () => setLoginOpen(true);
  const loginHandleClose = () => setLoginOpen(false);
  const notificationHandleOpen = () => setNotificationOpen(true);
  const notificationHandleClose = () => setNotificationOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState(null);
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
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const takeOutSelectedUser = () => {
    dispatch(selectOff());
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  //   '#2E3B55' }}
  return (
    <Box style={{ marginBottom: "64px" }}>
      <AppBar
        position="fixed"
        style={{ background: "#FFFBF2", height: "43px" }}
      >
        <Toolbar style={{ marginTop: "-10px" }}>
          <Button
            style={{
              color: "black",
              marginLeft: "-15px",
              fontSize: "16px",
              fontFamily:
                "Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace",
              textTransform: "none",
              letterSpacing: "1.5px",
            }}
          >
            {/* <Badge badgeContent={7} variant="dot" color="primary">
              <NotificationsIcon />
            </Badge> */}
            iVIHO.com
          </Button>
          {/* <Button
            onClick={takeOutSelectedUser}
            style={{ color: "black", marginLeft: "-10px" }}
          >
            <Badge badgeContent={7} variant="dot" color="primary">
              <NotificationsIcon />
            </Badge>
            selectedUser 빼기
          </Button> */}
          <Box sx={{ flexGrow: 1, marginLeft: "475px" }}>
            {result.length !== 0 ? (
              <form
                onSubmit={(event) => {
                  searchInputHandleSubmit(event, searchText);
                  setSearchText("");
                }}
              >
                <SearchInputComponent
                  setSearchText={setSearchText}
                  searchText={searchText}
                  searchInputProps={searchInputProps}
                />
                <Button
                  type="submit"
                  style={{
                    display: "none",
                  }}
                />
              </form>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={notificationOpen}
                onClose={notificationHandleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                style={{ width: "338px" }}
              >
                <Fade in={notificationOpen}>
                  <Box sx={notificationStyle}>
                    <NotificationForm />
                  </Box>
                </Fade>
              </Modal>
            </IconButton>
            {!currentUser || currentUser.username === "guest" ? (
              <>
                {/* <Button
                  onClick={(e) => logoutHandler()}
                  style={{ color: "black" }}
                >
                  <LogoutIcon />
                  로그아웃
                </Button> */}
                <Typography style={{ marginTop: "8px", marginRight: "10px" }}>
                  {currentUser
                    ? currentUser.username === "guest" &&
                      "게스트로 입장하셨습니다."
                    : ""}
                </Typography>
                <Button
                  style={{ color: "black" }}
                  onClick={registrationHandleOpen}
                >
                  <AssignmentInd />
                  회원 가입
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={registrationOpen}
                  onClose={registrationHandleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{ width: "1500px" }}
                >
                  <Fade in={registrationOpen}>
                    <Box sx={registrationStyle}>
                      <RegistrationForm />
                    </Box>
                  </Fade>
                </Modal>
                <Button onClick={loginHandleOpen} style={{ color: "black" }}>
                  <LoginIcon />
                  로그인
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={loginOpen}
                  onClose={loginHandleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{ width: "338px" }}
                >
                  <Fade in={loginOpen}>
                    <Box sx={loginStyle}>
                      <LoginForm
                        accessFrom="navbar"
                        registrationHandleOpen={registrationHandleOpen}
                      />
                    </Box>
                  </Fade>
                </Modal>
                <Button>
                  <Link
                    to="/api/login"
                    className="kakao"
                    style={{ textDecoration: "none" }}
                  >
                    <Paper>
                      <img
                        src="/image/kakao_login/ko/kakao_login_medium_narrow.png"
                        className="kakao-img"
                        style={{ width: "80px" }}
                      />
                    </Paper>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Typography
                  style={{
                    marginTop: "8px",
                    marginRight: "10px",
                    color: "black",
                  }}
                >
                  {currentUser.email.includes("kakao.com")
                    ? currentUser.name
                    : currentUser.username}
                  님 반갑습니다..!
                </Typography>
                <Button
                  onClick={(e) => logoutHandler()}
                  style={{ color: "black" }}
                >
                  <LogoutIcon />
                  로그아웃
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
