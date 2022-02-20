import { Fragment, useEffect, useState } from "react";
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
import { Button, Container, Paper } from "@mui/material";
import Blur from "react-css-blur";
import Spinner from "../Spinner";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";
import { afs } from "../../apiCalls/tryData";
import { Box } from "@mui/system";

const Loading = () => (
  <div className="item">
    <Spinner size={8} />
  </div>
);

const Indicator = (props) => {
  const { identifier } = props;
  const [todos, setTodos] = useState([]);
  const [idx, setIdx] = useState(1);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await dataRequest.get(
          "/data/" + identifier + "/idx/" + idx
        );
        setTodos([...todos, ...res.data]);
      } catch (e) {}
    };

    fetchTodos();
  }, [idx]);

  const handleScroll = (e) => {
    console.log(e);
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (
      Math.abs(
        parseInt(scrollHeight) - (parseInt(offsetHeight) + parseInt(scrollTop))
      ) <= 1
    ) {
      setIdx(todos.length);
    }
  };

  return (
    <div
      className="todos-list"
      onScroll={handleScroll}
      style={{
        paddingLeft: "0px",
        marginLeft: "12px",
        width: "248px",
        border: "none",
        overflowY: "scroll",
        height: "920px",
      }}
    >
      {todos.map((todo, index) => {
        return (
          <Paper
            className="todo"
            key={index}
            style={{
              padding: "10px",
              width: "231px",

              marginBottom: "5px",
              backgroundColor: "#FFFBF2", //#ffe8b3 베이지#FFFBF2
              // borderBottomLeftRadius: "10px",
              // borderBottomRightRadius: "10px",
              borderRadius: "10px",
            }}
          >
            <Button style={{ padding: "0px" }}>
              <Paper
                style={{
                  marginLeft: "-4px",
                  marginTop: "-4px",
                  width: "220px",
                  backgroundColor: "white",
                  minHeight: "200px",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      src={todo.owner.profileimage}
                      aria-label=""
                    ></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={todo.title.substring(0, 30) + "..."}
                  subheader={
                    todo.owner.username
                      ? todo.owner.username.substring(0, 50)
                      : ""
                  }
                />
                <Blur radius={"2px"}>
                  <CardMedia
                    component="img"
                    // 194

                    image={todo.core}
                    alt=""
                  />
                </Blur>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {todo.desc}
                  </Typography>
                </CardContent>
                <CardActions sx={{}} disableSpacing>
                  {/* <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton>
                    <ShareIcon />
                  </IconButton> */}
                </CardActions>
                <Divider />
              </Paper>
            </Button>
          </Paper>
        );
      })}
    </div>
  );
};

export default Indicator;
