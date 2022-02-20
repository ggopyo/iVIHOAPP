import { Cancel, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Fade,
  Icon,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const HowTo = (props) => {
  let {
    howtoLogoCreate,
    howtoLogo,
    phase,
    values,
    handleChange,
    classes,
    inputPhase,
    howtoLogoCheck,
    clickPost,
    needLogo,
    logoCreateHandleOpen,
    logoCreateOpen,
    logoCreateHandleClose,
    Backdrop,
    logoCreateStyle,
    modifyingLogoLink,
    logoHandleChange,
  } = props;
  return (
    <Box>
      {phase === null && (
        <>
          <TextField
            placeholder="HowtoLink"
            label="HowtoLink"
            value={values.text.core}
            onChange={handleChange("core")}
            className={classes.root}
            maxRows={3}
            style={{
              paddingBottom: "20px",
              marginTop: "80px",
              marginLeft: "30px",
              height: "100%",
              width: "80%",
            }}
            margin="normal"
            variant="standard"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                inputPhase("info");
                howtoLogoCheck(values.text.core);
              }}
              style={{
                height: "50%",
                width: "40%",
              }}
              disabled={values.text === {}}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Done
                  style={{
                    width: "50px",
                    color: "#0E5711",
                    height: "50px",
                  }}
                />
              </Paper>
            </Button>
            <Button
              style={{
                height: "50%",
                width: "40%",
                marginLeft: "5px",
              }}
              disabled={values.text === {}}
              onClick={() => inputPhase(null)}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Cancel
                  style={{
                    width: "50px",
                    color: "red",
                    height: "50px",
                  }}
                />
              </Paper>
            </Button>
          </div>
        </>
      )}
      {phase === "info" && (
        <>
          {needLogo === true ? (
            <>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "140px",
                  border: "solid 0.1px",
                  size: "5px",
                  paddingLeft: "9px",
                  paddingTop: "2px",
                  borderRadius: "5px",
                  color: "gray",
                }}
                role="button"
                onClick={logoCreateHandleOpen}
              >
                사이트 <br /> 로고가
                <br /> 없어요
              </div>
              {/* <ModalShowUp
                        logoCreateHandleOpen1={logoCreateHandleOpen1}
                        logoCreateOpen1={logoCreateOpen1}
                        logoCreateHandleClose1={logoCreateHandleClose1}
                      /> */}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={logoCreateOpen}
                onClose={logoCreateHandleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                invisible={true}
                style={{}}
              >
                <Fade in={logoCreateOpen}>
                  <Box sx={logoCreateStyle}>
                    <>
                      <TextField
                        placeholder="LogoImageLink"
                        label="LogoImageLink"
                        value={modifyingLogoLink}
                        onChange={logoHandleChange}
                        className={classes.root}
                        style={{
                          height: "100%",
                          width: "80%",
                        }}
                        margin="normal"
                        variant="standard"
                      />{" "}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          style={{
                            height: "50%",
                            width: "40%",
                          }}
                          disabled={values.text === {}}
                          onClick={() => {
                            howtoLogoCreate();
                            logoCreateHandleClose();
                          }}
                        >
                          <Paper
                            elevation={3}
                            style={{
                              height: "98%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Done
                              style={{
                                width: "50px",
                                color: "#0E5711",
                                height: "50px",
                              }}
                            />
                          </Paper>
                        </Button>
                        <Button
                          style={{
                            height: "50%",
                            width: "40%",
                            marginLeft: "5px",
                          }}
                          disabled={values.text === {}}
                          onClick={() => inputPhase(null)}
                        >
                          <Paper
                            elevation={3}
                            style={{
                              height: "98%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Cancel
                              style={{
                                width: "50px",
                                color: "red",
                                height: "50px",
                              }}
                            />
                          </Paper>
                        </Button>
                      </div>
                    </>
                  </Box>
                </Fade>
              </Modal>
            </>
          ) : (
            <img
              alt=""
              src={howtoLogo}
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "138px",
              }}
            />
          )}
          <TextField
            placeholder="제목"
            label="제목"
            value={values.text.title}
            onChange={handleChange("title")}
            className={classes.root}
            style={{
              paddingBottom: "10px",
              marginTop: "0px",
              marginLeft: "30px",
              height: "100%",
              width: "80%",
            }}
            margin="dense"
            variant="standard"
          />{" "}
          <TextField
            placeholder="설명"
            label="설명"
            value={values.text.desc}
            onChange={handleChange("desc")}
            className={classes.root}
            style={{
              paddingBottom: "10px",
              marginTop: "0px",
              marginLeft: "30px",
              height: "100%",
              width: "80%",
            }}
            margin="dense"
            variant="standard"
          />
          <TextField
            placeholder="분류"
            label="분류"
            value={values.text.category}
            onChange={handleChange("category")}
            multiline
            className={classes.root}
            maxRows={3}
            style={{
              paddingBottom: "10px",
              marginLeft: "30px",
              marginTop: "0px",
              height: "100%",
              width: "80%",
            }}
            margin="dense"
            variant="standard"
          />
          <span>{values.photo ? values.photo.name : ""}</span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">error</Icon>
              {values.error}
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                height: "50%",
                width: "40%",
              }}
              disabled={values.text === {}}
              onClick={() => clickPost()}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Done
                  style={{
                    width: "50px",
                    color: "#0E5711",
                    height: "50px",
                  }}
                />
              </Paper>
            </Button>
            <Button
              style={{
                height: "50%",
                width: "40%",
                marginLeft: "5px",
              }}
              disabled={values.text === {}}
              onClick={() => inputPhase(null)}
            >
              <Paper
                elevation={3}
                style={{
                  height: "98%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Cancel
                  style={{
                    width: "50px",
                    color: "red",
                    height: "50px",
                  }}
                />
              </Paper>
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default HowTo;
