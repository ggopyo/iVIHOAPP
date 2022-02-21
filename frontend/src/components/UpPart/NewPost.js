import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";
import PropTypes from "prop-types";

import { Backdrop, CardActions } from "@mui/material";

import { useLocation } from "react-router-dom";
import { createPost, modifyNewest } from "../../apiCalls/general/tryData";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { dataRequest } from "../../apiCalls/general/requestMethod";
import HowtoComponent from "./HowtoComponent";
import YouTubeComponent from "./YouTubeComponent";
import ImageComponent from "./ImageComponent";

export default function NewPost(props) {
  const { postSort, addUpdate } = props;

  const location = useLocation();
  const cl = location.pathname.split("/")[1];
  const c = useSelector((state) => state.login.currentUser);

  const [values, setValues] = useState({
    text: {},
    photo: "",
    error: "",
  });
  const [updated, setUpdated] = useState(false);
  const [needLogo, setNeedLogo] = useState(false);
  const [howtoLogo, setHowtoLogo] = useState(null);
  const [howtoLogoId, setHowtoLogoId] = useState(null);
  const [modifyingLogoLink, setModifyingLogoLink] = useState(null);
  const [currentAddr, setCurrentAddr] = useState(null);
  const [youtubeThumbnail, setYoutubeThumbnail] = useState(null);

  const getYoutubeThumbnail = (addr) => {
    let regex;
    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    else if (addr.substring(0, 5) === "http:")
      regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = addr.match(regex)[1];
    setYoutubeThumbnail(`https://img.youtube.com/vi/${id}/default.jpg`);
  };

  const howtoLogoCheck = (addr) => {
    const checkLogoExist = async (addr) => {
      try {
        const hostname = new URL(addr).hostname;
        setCurrentAddr(hostname);
        const res = await dataRequest.post("/howtologo/find", {
          domainname: hostname,
        });

        if (res.data.code === "success") {
          setNeedLogo(false);
          setHowtoLogo(res.data.domainimage);
          setHowtoLogoId(res.data._id);
        } else {
          setNeedLogo(true);
          setHowtoLogo(null);
          setHowtoLogoId(null);
        }
      } catch (err) {
        setNeedLogo(true);
        setHowtoLogo(null);
        setHowtoLogoId(null);
        console.log(err);
      }
    };
    checkLogoExist(addr);
  };

  const [logoCreateOpen, setLogoCreateOpen] = useState(false);
  const logoCreateHandleOpen = () => {
    setLogoCreateOpen(true);
  };
  const logoCreateHandleClose = () => setLogoCreateOpen(false);

  const logoHandleChange = (event) => {
    setModifyingLogoLink(event.target.value);
  };
  const howtoLogoCreate = () => {
    const linkCreate = async () => {
      try {
        const res = await dataRequest.post("/howtologo/create", {
          domainname: currentAddr,
          domainimage: modifyingLogoLink,
          contributedby: c._id,
        });
        if (res.data === "success") {
          setHowtoLogo(modifyingLogoLink);
          setNeedLogo(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    linkCreate();
  };
  const [phase, setPhase] = useState("begin");
  const logoCreateStyle = {
    position: "absolute",
    transform: "translate(150%, 120%)",
    width: "220px",
    borderRadius: "10px",
    opacity: "1 !important",
    bgcolor: "white",
    border: "none",
    boxShadow: 24,
    pl: 3,
    pr: 0,
  };
  useEffect(() => {}, [
    howtoLogo,
    howtoLogoId,
    needLogo,
    youtubeThumbnail,
    currentAddr,
  ]);
  useEffect(() => {}, [updated]);

  //자료가 제출됐을 때 동작되는 함수
  const clickPost = () => {
    let postData = new FormData();
    if (postSort === "image") {
      if (values.photo) {
        postData.append("photo", values.photo);
        postData.append("core.eitherType", "file");
        // postData.append("core.data.file", values.photo);
      } else {
        postData.append("core.data.link", values.text.core);
        postData.append("core.eitherType", "link");
      }
    } else if (postSort === "youtube") {
      postData.append("core", values.text.core);
    } else if (postSort === "howto") {
      postData.append("core", values.text.core);
      postData.append("logo", howtoLogoId);
    }
    postData.append("title", values.text.title);
    postData.append("desc", values.text.desc);
    postData.append("category", values.text.category);
    postData.append("identifier", postSort);
    postData.append("owner", c._id);

    createPost(postSort, postData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, text: {}, photo: "" });

        addUpdate(data, postSort);
        setPhase(null);
        modifyNewest(data.identifier, data._id);
      }
    });
  };

  const [compressedFile, setCompressedFile] = useState(null);

  const handleChange = (name) => (event) => {
    if (name === "photo") {
      const value = event.target.files[0];
      new Compressor(value, {
        quality: 0.8,
        success: (compressedResult) => {
          setValues({ ...values, photo: compressedResult });
        },
      });
    } else {
      const value = event.target.value;
      setValues({ ...values, text: { ...values.text, [name]: value } });
    }
  };

  const logoCreateHandleOpen1 = () => {
    setLogoCreateOpen1(true);
  };
  const [logoCreateOpen1, setLogoCreateOpen1] = useState(false);
  const logoCreateHandleClose1 = () => setLogoCreateOpen1(false);

  const inputPhase = (input) => {
    setPhase(input);
  };

  useEffect(() => {
    if (values.photo !== "") {
      setPhase("info");
    } else {
      setPhase(null);
    }
  }, [values.photo]);

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
      <Box>
        <Box>
          {postSort === "howto" && (
            <HowtoComponent
              phase={phase}
              values={values}
              handleChange={handleChange}
              classes={classes}
              inputPhase={inputPhase}
              howtoLogoCheck={howtoLogoCheck}
              clickPost={clickPost}
              needLogo={needLogo}
              logoCreateHandleOpen={logoCreateHandleOpen}
              logoCreateOpen={logoCreateOpen}
              logoCreateHandleClose={logoCreateHandleClose}
              Backdrop={Backdrop}
              logoCreateStyle={logoCreateStyle}
              modifyingLogoLink={modifyingLogoLink}
              logoHandleChange={logoHandleChange}
              howtoLogoCreate={howtoLogoCreate}
              howtoLogo={howtoLogo}
            />
          )}
          {postSort === "youtube" && (
            <YouTubeComponent
              phase={phase}
              values={values}
              handleChange={handleChange}
              classes={classes}
              inputPhase={inputPhase}
              getYoutubeThumbnail={getYoutubeThumbnail}
              clickPost={clickPost}
              youtubeThumbnail={youtubeThumbnail}
            />
          )}

          {postSort === "image" && (
            <ImageComponent
              phase={phase}
              handleChange={handleChange}
              inputPhase={inputPhase}
              values={values}
              classes={classes}
              clickPost={clickPost}
            />
          )}
        </Box>
        <CardActions></CardActions>
      </Box>
    </div>
  );
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};
