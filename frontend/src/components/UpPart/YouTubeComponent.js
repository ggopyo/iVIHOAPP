import { Cancel, Done } from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const YouTube = (props) => {
  let {
    phase,
    values,
    handleChange,
    classes,
    inputPhase,
    getYoutubeThumbnail,
    clickPost,
    youtubeThumbnail,
  } = props;
  return (
    <div>
      <>
        {phase === null && (
          <>
            <TextField
              placeholder="YoutubeLink"
              label="YoutubeLink"
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
            />{" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  height: "50%",
                  width: "40%",
                }}
                disabled={values.text === {}}
                onClick={() => {
                  inputPhase("info");
                  getYoutubeThumbnail(values.text.core);
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
        )}
        {phase === "info" && (
          <>
            <img
              alt=""
              src={youtubeThumbnail}
              style={{
                width: "100px",
                height: "60px",
                marginLeft: "115px",
              }}
            />

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
            />
            <TextField
              placeholder="설명"
              label="설명"
              value={values.text.desc}
              onChange={handleChange("desc")}
              className={classes.root}
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
      </>
    </div>
  );
};

export default YouTube;
