import { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { slide as Menu } from "react-burger-menu";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  background-color: gray;
  border-color: gray;
`;

function Spinner({ props }) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <>
      <ClipLoader color={color} loading={loading} css={override} size={10} />
    </>
  );
}

export default Spinner;
