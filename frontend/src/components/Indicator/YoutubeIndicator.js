import { Fragment, useState } from "react";
import useVirtual from "react-cool-virtual";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Button, Container } from "@mui/material";
import Blur from "react-css-blur";
import Spinner from "../Spinner";
import "./styles.css";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";
import { afs } from "../../apiCalls/tryData";

const TOTAL_COMMENTS = 1000;
const BATCH_COMMENTS = 4;
const isItemLoadedArr = [];
isItemLoadedArr[50] = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const loadData = async ({ loadIndex }, setComments) => {
  isItemLoadedArr[loadIndex] = true;

  try {
    await sleep(2000);

    const URL = "/data/youtube/";
    let { data } = await dataRequest.get(URL); // all

    var searchIndex = loadIndex * 4;
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }
    data = shuffle(data);
    var { data: comments } = await publicRequest.post("/youtube/findmany/id", [
      data[searchIndex]._id,
      data[searchIndex + 1]._id,
      data[searchIndex + 2]._id,
      data[searchIndex + 3]._id,
    ]);
    setComments((prevComments) => [...prevComments, ...comments]);
  } catch (err) {
    isItemLoadedArr[loadIndex] = false;
    loadData({ loadIndex }, setComments);
  }
};

const Loading = () => (
  <div className="item">
    <Spinner size={8} />
  </div>
);

const Indicator = () => {
  const [comments, setComments] = useState([]);
  const { outerRef, innerRef, items } = useVirtual({
    itemCount: comments.length,
    loadMoreCount: BATCH_COMMENTS,
    isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
    loadMore: (e) => loadData(e, setComments),
  });

  return (
    <div
      className="outer"
      ref={outerRef}
      style={{
        paddingLeft: "24px",
        paddingRight: "24px",
        width: "350px",
        height: "850px",
        overflow: "auto",
        border: "none",
      }}
    >
      <div ref={innerRef}>
        {items.length ? (
          items.map(({ index, measureRef }) => {
            const showLoading =
              index === comments.length - 1 && comments.length < TOTAL_COMMENTS;

            return (
              <Fragment key={index}>
                <Button>
                  <Card sx={{ width: "260px", mb: "10px" }} ref={measureRef}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          src={comments[index].owner.profileimage}
                          aria-label="recipe"
                        >
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={comments[index].title.substring(0, 30) + "..."}
                      subheader={
                        comments[index].owner.username
                          ? comments[index].owner.username.substring(0, 50)
                          : ""
                      }
                    />
                    <Blur radius={"2px"}>
                      <CardMedia
                        component="img"
                        // 194

                        image={comments[index].core}
                        alt=""
                      />
                    </Blur>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{}}
                      >
                        {comments[index].desc}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{}} disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                    <Divider />
                  </Card>
                </Button>
                {showLoading && <Loading />}
              </Fragment>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Indicator;
