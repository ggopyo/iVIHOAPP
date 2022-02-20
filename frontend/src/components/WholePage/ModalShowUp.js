import { Cancel, Done } from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";

const ModalShowUp = (props) => {
  // const logoHandleChange = (event) => {
  //   setModifyingLogoLink(event.target.value);
  // };

  const logoCreateStyle = {
    position: "absolute",

    width: "1145px",
    height: "600px",
    marginLeft: "65px",
    marginTop: "25px",
    borderRadius: "5px",
    opacity: "0.9 !important",
    backgroundColor: "gray",
    bgcolor: "white",
    border: "none",
    boxShadow: 24,
    pl: 3,
    pr: 0,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& div.MuiBackdrop-root": {
        backgroundColor: "black",
      },
      "& label.Mui-focused": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#ffe8b3",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ffe8b3",
        },
        "&:hover fieldset": {
          borderColor: "#ffe8b3",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ffe8b3",
        },
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={props.logoCreateOpen1}
        onClose={props.logoCreateHandleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        invisible={true}
        style={{}}
      >
        <Fade in={props.logoCreateOpen1}>
          <Box sx={logoCreateStyle}>
            <></>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalShowUp;
