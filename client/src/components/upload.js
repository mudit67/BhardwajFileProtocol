import React, {useState} from 'react';
import  axios from "axios";

function Upload(props){
  const [fileName,setFileName] = useState("");
  return(
    <div className="upload ml-2 ml-md-3 ">
      <label
        htmlFor="file-upload"
        className="nav-button"
        >
          Click to upload
      </label>
      <input
        type="file"
        className="d-none"
        id="file-upload"
        onChange={(e) => {
          fileUpload(e,props);
          setFileName(e.target.files[0].name);
        }}
      />
      <div className="ml-2">
        {fileName}
      </div>
    </div>
  );
}
function fileUpload(event,props) {
  console.log(event.target.files[0].name);
  const data = new FormData();
  data.append("file", event.target.files[0]);
  axios
    .post(`${window.backendUrl}/uploadFile`, data, {})
    .then((response) => {
      console.log(response)
      alert(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default Upload;
