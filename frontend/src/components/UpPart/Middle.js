import React, { useEffect, useState } from "react";
import MiddleTab from "./MiddleTab";

export default function Profile(props) {
  const { triggerTabObject, myProfileGroup, yourStatistic } = props;

  const [posts, setPosts] = useState({ howto: [], image: [], youtube: [] });

  return (
    <div style={{ width: "100%" }}>
      <MiddleTab
        posts={posts}
        // userid={currentUser ? currentUser._id : ""}
        whichSide="right"
        myProfileGroup={myProfileGroup}
        triggerTabObject={triggerTabObject}
        yourStatistic={yourStatistic}
        // removePostUpdate={removePost}
      />{" "}
    </div>
  );
}
