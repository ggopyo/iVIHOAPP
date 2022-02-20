import { Box, AppBar } from "@mui/material";
import { useState } from "react";
import SearchTab from "../UpPart/SearchTab";
export default function BottomBar(props) {
  const { posts, addUpdate, profileUser, setTab } = props;
  const [isShown, setIsShown] = useState(false);
  return (
    <Box>
      <AppBar
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        position="fixed"
        style={{
          marginTop: isShown ? "285px" : "625px",
          width: "380px",
          height: isShown ? "490px" : "25px",
          background: "#2E3B55",
          borderTopLeftRadius: "5px",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isShown && (
          <div
            style={{
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              backgroundColor: "#FFFBF2",
              marginTop: "5px",
            }}
          >
            <SearchTab
              profileUser={profileUser}
              posts={posts}
              setTab={setTab}
              addUpdate={addUpdate}
              // removePostUpdate={removePost}
            />{" "}
          </div>
        )}
        ▲
      </AppBar>
    </Box>
  );
}
