import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { dataRequest } from "../../apiCalls/general/requestMethod";
import { Avatar, Grid, Typography } from "@mui/material";

export default function FollowGrid(props) {
  useEffect(() => {
    const getProfile = async (username) => {
      try {
        const res = await dataRequest.get("/user/username/" + username);
      } catch (err) {}
    };
    getProfile(props.user.username);
  });
  return (
    <div>
      <Grid container cellHeight={160} cols={4}>
        {props.people.map((person, i) => {
          return (
            <Grid item style={{ height: 120 }} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={"" + person._id} />
                <Typography>{person.name}</Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};
