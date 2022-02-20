import React, { useCallback, useEffect, useState } from "react";

import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ImageIndicator from "./ImageIndicator";
import HowtoIndicator from "./HowtoIndicator";
import YoutubeIndicator from "./YoutubeIndicator";
import SideIndicator from "./SideIndicator";
import SideShow from "../SideShow";
import { afs } from "../../apiCalls/tryData";
import { dataRequest, publicRequest } from "../../apiCalls/requestMethod";
import Indicators from "./Indicators";
import { useDispatch, useSelector } from "react-redux";

import { SettingsOverscanRounded } from "@mui/icons-material";

const DataProvider = () => {
  const TOTAL_COMMENTS = 1000;
  const BATCH_COMMENTS = 3;
  const isItemLoadedArr = [];
  isItemLoadedArr[50] = true;
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const postsToStore = (posts) => {};

  useEffect(() => {}, [saved]);
  const changeHandler = useCallback((event, value) => {
    setLoading(value);

    setLoading(false);
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <div>
      <Indicators
        loading={loading}
        allData={allData}
        changeHandler={changeHandler}
        saved={saved}
      />
    </div>
  );
};

export default DataProvider;
