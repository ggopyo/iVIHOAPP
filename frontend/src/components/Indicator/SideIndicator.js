import { Fragment, useState } from "react";
import useVirtual from "react-cool-virtual";
import "./styles.css";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const TOTAL_COMMENTS = 500;
const BATCH_COMMENTS = 10;
const isItemLoadedArr = [];
isItemLoadedArr[50] = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadData = async ({ loadIndex }, setComments) => {
  isItemLoadedArr[loadIndex] = true;

  try {
    await sleep(2000);

    let { data } = await dataRequest.get("/data/howto/");
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
    var searchIndex = loadIndex * 10;

    var { data: comments } = await publicRequest.post("/howto/findmany/id", [
      data[searchIndex]._id,
      data[searchIndex + 1]._id,
      data[searchIndex + 2]._id,
      data[searchIndex + 3]._id,
      data[searchIndex + 4]._id,
      data[searchIndex + 5]._id,
      data[searchIndex + 6]._id,
      data[searchIndex + 7]._id,
      data[searchIndex + 8]._id,
      data[searchIndex + 9]._id,
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

const SideIndicator = () => {
  const [comments, setComments] = useState([]);
  const { outerRef, innerRef, items } = useVirtual({
    itemCount: comments.length,
    loadMoreCount: BATCH_COMMENTS,
    isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
    loadMore: (e) => loadData(e, setComments),
  });

  return (
    <div>
      <List
        className="outer"
        ref={outerRef}
        sx={{
          pr: 17,
          ml: 8,
          top: -10,
          width: "100%",
          height: "1000px",
          overflow: "auto",
          border: "none",
        }}
      >
        <div ref={innerRef}>
          {items.length ? (
            items.map(({ index, measureRef }) => {
              const showLoading =
                index === comments.length - 1 &&
                comments.length < TOTAL_COMMENTS;

              return (
                <ListItem
                  alignItems="flex-start"
                  style={{ width: 270, padding: 0, borderRadius: 5 }}
                  key={index}
                >
                  <ListItemAvatar>
                    <Link
                      to={`/user/${comments[index].owner.username}`}
                      style={{ textDecoration: "none", color: "black" }}
                      state={{}}
                    >
                      <Avatar
                        alt={comments[index].owner.username}
                        src={comments[index].owner.profileimage}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        to={`/howto/${comments[index]._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                        state={{}}
                      >
                        {comments[index].title}
                      </Link>
                    }
                    secondary={
                      <Fragment>
                        <Typography
                          style={{
                            marginRight: 0,
                            display: "inline",
                            padding: "16px",
                          }}
                          ref={measureRef}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <Link
                            to={`/user/${comments[index].owner.username}`}
                            style={{ textDecoration: "none", color: "black" }}
                            state={{}}
                          >
                            {comments[index].owner.username}
                          </Link>
                        </Typography>
                        <Link
                          to={`/howto/${comments[index]._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                          state={{}}
                        >
                          {comments[index].desc}
                        </Link>
                        <Divider />
                        {showLoading && <Loading />}
                      </Fragment>
                    }
                  />
                </ListItem>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </List>
    </div>
  );
};

export default SideIndicator;
