import React, { useState } from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import {
  Email,
  FindInPage,
  GetApp,
  GitHub,
  Send,
  SwapHoriz,
} from "@mui/icons-material";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "23px",
      backgroundColor: "white",
      minHeight: "0px",
      color: "silver",
    },
    indicator: {
      backgroundColor: "#ffe8b3",
      font: "bold",
    },
  }));

  const classes = useStyles();
  return (
    <div
      style={{
        marginTop: "10px",
        marginLeft: "5px",
        marginRight: "10px",
        paddingLeft: "0px",
        width: "310px",
        overflow: "hidden",
        height: "325px",
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        color="default"
        className={classes.root}
        style={{
          paddingBottom: "2px",
          borderBottom: "solid",
          borderTop: "solid",
          borderWidth: "0.1px",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          classes={{
            indicator: classes.indicator,
          }}
          textColor="primary"
          variant="standard"
          className={classes.root}
          style={{ marginLeft: "10px" }}
        >
          <Tab
            className={classes.root}
            label={"선택 정보 📰"}
            style={{
              minWidth: "25%",
              maxWidth: "25%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              paddingBottom: "5px",
              marginRight: "5px",
            }}
          />
          <Divider
            orientation="vertical"
            style={{ marginTop: "2px" }}
            flexItem
          />
          <Tab
            className={classes.root}
            label={"프로필 보기 👀"}
            style={{
              minWidth: "25%",
              maxWidth: "25%",
              paddingTop: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
              marginLeft: "5px",
              paddingBottom: "5px",
            }}
          />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <div>
          <TabContainer>
            <Container
              style={{
                disableGutters: "true",
                marginLeft: -5,
                marginTop: "0px",
                marginBottom: "10px",
                width: "260px",
                paddingLeft: "-5px",
                paddingRight: "0px",
                padding: "0px",
                height: "325px",
              }}
            >
              <Box
                style={{
                  height: "15px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                  boxShadow: 1,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  style={{
                    color: "gray",
                    marginRight: "20px",
                  }}
                  variant="caption"
                >
                  궁금하지 않으세요 ❓
                </Typography>
                <Box>
                  <ListItem
                    alignItems="flex-end"
                    style={{
                      top: "-10px",
                      height: "44px",
                      width: "180px",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      paddingLeft: "5px",
                      border: "solid gray",
                      borderWidth: "thin",
                      borderRadius: "4px",
                    }}
                    dense
                  >
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          width: "30px",
                          height: "30px",
                          minWidth: "0px",
                        }}
                        alt=""
                        //
                      />
                    </ListItemAvatar>
                    <ListItemText primary="hourdeadwood" />
                  </ListItem>
                </Box>
              </Box>
              <Typography style={{ marginTop: "25px", color: "gray" }}>
                제목
              </Typography>
              <Typography
                variant="h5"
                style={{
                  marginTop: "3px",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                }}
              >
                리액트로 취업하기
              </Typography>{" "}
              <Divider
                style={{
                  color: "gray",
                  marginTop: "2px",
                  marginBottom: "0px",
                  marginLeft: "5px",
                  width: "220px",
                }}
              />
              <Typography
                style={{
                  marginTop: "0px",
                  marginLeft: "7px",
                  marginBottom: "35px",
                }}
                variant="caption"
              >
                분류 : React, FrontEnd
              </Typography>
              <div style={{ display: "flex" }}>
                <Typography style={{ marginTop: "15px" }}>작성자</Typography>
                <Typography
                  variant="h5"
                  style={{
                    marginTop: "12px",
                    marginLeft: "5px",
                    fontWeight: "bold",
                    paddingLeft: "7px",
                  }}
                >
                  hourdeadwood
                </Typography>{" "}
              </div>
              <Divider
                style={{
                  color: "gray",
                  marginTop: "2px",
                  marginLeft: "40px",
                  marginBottom: "10px",
                  width: "185px",
                }}
              />
              <Typography style={{ marginTop: "5px" }}>설명</Typography>
              <Box
                style={{
                  marginLeft: "5px",
                  marginTop: "5px",
                  paddingLeft: "5px",
                  border: "solid silver",
                  borderWidth: "thin",
                  width: "280px",
                  height: "40px",
                }}
                rows={4}
              >
                <Typography style={{ marginTop: "5px" }}>
                  tab 활용하는 방법은
                </Typography>
              </Box>
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 0.1,
                    m: 0.1,

                    bgcolor: "background.paper",
                  }}
                >
                  <Button
                    sx={{
                      border: "solid 1px",
                      display: "flex",
                      height: "35px",
                      width: "150px",
                      fontSize: "20px",
                      color: "white",
                      borderRadius: "15px",
                      backgroundColor: "skyblue",
                      padding: "3px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "1px",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "skyblue",
                      },
                    }}
                    color="primary"
                  >
                    <div style={{ marginRight: "2px" }}>SWAP</div>
                    <SwapHoriz style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    sx={{
                      border: "solid 1px",
                      display: "flex",
                      height: "35px",
                      width: "150px",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "15px",
                      backgroundColor: "skyblue",
                      padding: "3px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "1px",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "skyblue",
                      },
                    }}
                    color="primary"
                  >
                    <div style={{ marginRight: "2px" }}>GetLink</div>
                    <GetApp style={{ fontSize: "20px" }} />
                  </Button>
                </Box>
              </div>
            </Container>
          </TabContainer>
        </div>
      )}
      {tab === 2 && (
        <div>
          <TabContainer>
            <Card sx={{ maxWidth: 345, height: 215 }}>
              <CardMedia
                component="img"
                height="100"
                image="https://cdn.pixabay.com/photo/2015/06/25/11/16/sky-821153_1280.jpg"
              />
              <div style={{ justifyContent: "center", display: "flex" }}>
                <Avatar
                  style={{
                    width: "65px",
                    height: "65px",
                    marginTop: "-40px",
                  }}
                  //
                />
              </div>{" "}
              <div>
                <CardContent
                  style={{
                    marginTop: "-10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    hourdeadwood
                  </Typography>

                  <Typography
                    align="center"
                    variant="body2"
                    color="text.secondary"
                    style={{ marginTop: "5px" }}
                  >
                    안녕하세요 개발을 사랑하고 리액트로 취업을 원합니다
                  </Typography>
                  <Button
                    sx={{
                      border: "solid 0px",
                      display: "flex",
                      color: "white",
                      borderRadius: "15px",
                      padding: "3px",
                      backgroundColor: "#E95F6E",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "skyblue",
                      },
                    }}
                    color="primary"
                  >
                    <div style={{ marginRight: "2px" }}>FOLLOW</div>
                    <PersonAddAltIcon />
                  </Button>
                </CardContent>
              </div>
            </Card>
            <Card sx={{ maxWidth: 345, height: 57, marginTop: "10px" }}>
              <CardContent
                style={{
                  marginTop: "-10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "-5px",
                      marginTop: "5px",
                      width: "150px",
                    }}
                  >
                    <GitHub />
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ marginLeft: "5px", marginTop: "-1px" }}
                    >
                      /hourdeadwood
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "-5px",
                      width: "190px",
                    }}
                  >
                    <Email />
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ marginLeft: "5px", marginTop: "-1px" }}
                    >
                      hourdeadwood@gmail.com
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    sx={{
                      border: "solid 1px",
                      display: "flex",
                      height: "23px",
                      color: "white",
                      width: "75px",
                      borderRadius: "15px",
                      backgroundColor: "skyblue",
                      padding: "3px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "1px",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "skyblue",
                      },
                    }}
                    color="primary"
                  >
                    <div style={{ marginRight: "2px" }}>Github</div>
                    <FindInPage />
                  </Button>{" "}
                  <Button
                    sx={{
                      border: "solid 1px",
                      display: "flex",
                      height: "23px",
                      width: "75px",
                      color: "white",
                      borderRadius: "15px",
                      backgroundColor: "skyblue",
                      padding: "3px",
                      paddingRight: "2px",
                      paddingLeft: "10px",
                      marginTop: "1px",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "skyblue",
                      },
                    }}
                    color="primary"
                  >
                    <div style={{ marginRight: "2px" }}>Email</div>
                    <Send />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabContainer>
        </div>
      )}
    </div>
  );
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
