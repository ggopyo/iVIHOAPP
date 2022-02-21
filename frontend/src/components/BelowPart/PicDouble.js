import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
const Pic = (props) => {
  const { dataItem, whichSide } = props;

  useEffect(() => {}, [dataItem]);
  const useStyles = makeStyles((theme) => ({
    left: {
      marginTop: "5px",
      marginRight: "5px",
      marginLeft: "5px",
      overflow: "hidden",
      height: "95%",
      display: "flex",
      justifyContent: "flex-start",
    },
    right: {
      marginTop: "5px",
      marginRight: "5px",
      marginLeft: "5px",
      paddingRight: "10px",
      overflow: "hidden",
      height: "95%",
      display: "flex",
      justifyContent: "flex-end",
    },
  }));

  const classes = useStyles();

  let regex;

  const getYoutubeThumbnail = (addr) => {
    if (addr.substring(0, 5) === "https")
      regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    const id = addr.match(regex)[1];
    return `https://img.youtube.com/vi/${id}/default.jpg`;
  };

  if (dataItem && dataItem.identifier === "youtube")
    var youtubeThumbnail = getYoutubeThumbnail(dataItem.core);
  return (
    <Paper
      className={whichSide === "left" ? classes.left : classes.right}
      elevation={1}
    >
      <img
        src={
          dataItem
            ? dataItem.identifier === "image"
              ? dataItem.core.eitherType === "link"
                ? dataItem.core.data.link
                : dataItem.image
              : dataItem.identifier === "howto"
              ? dataItem.logo.domainimage
              : youtubeThumbnail
            : ""
        }
        alt=""
        style={{
          zIndex: "999",
          height: "230px",
          width: "230px",
          padding: "5px",
        }}
      />
    </Paper>
  );
};

export default Pic;
