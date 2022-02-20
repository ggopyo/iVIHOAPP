import axios from "axios";

import React, { useState } from "react";
var formData = new FormData();
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState({});

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(formData.entries());
    axios.post("api/uploadfile", formData);
  };

  return (
    <div>
      <div>
        <h1>첨부파일</h1>
        <h3></h3>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}></button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FileUpload;
