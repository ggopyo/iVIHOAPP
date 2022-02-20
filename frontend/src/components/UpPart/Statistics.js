import { GetApp, SwapHoriz } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const Statistics = () => {
  return (
    <div>
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
                  src=""
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
    </div>
  );
};

export default Statistics;
