import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  axios from "axios";

function Upload(props){
  const [fileName,setFileName] = useState("");
  const [file,setFile] = useState('');
  const toggle = () => props.modalCallback(!props.modalBool);
    return(
      <div>
        <Modal isOpen={props.modalBool} toggle={toggle}>
          <ModalHeader>
            Upload Your Files
          </ModalHeader>
          <ModalBody>
            <div className="upload ml-2 ml-md-3 ">
                <label
                  htmlFor="file-upload"
                  className="nav-button"
                  >
                    {(fileName==="")?"Click to upload" : "Click Submit to upload"}
                </label>
                <input
                  type="file"
                  className="d-none"
                  multiple="true"
                  id="file-upload"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }}
                />
                <div className="ml-2">
                  {fileName}
                </div>
              </div>
          </ModalBody>
          <ModalFooter>
          <button className="nav-button bg-secodary" onClick={toggle}>Cancel</button>
          <button className="nav-button bg-info" onClick= {() => {fileUpload({file,setFileName},props)}} >Submit</button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
function fileUpload(param,props) {
  console.log(param);
  const data = new FormData();
  data.append("file", param.file);
  debugger

  axios
    .post(`${window.backendUrl}/uploadFile`, data, {
      // onUploadProgress:(progressEvent)=> {
      //   debugger
      //   console.log(progressEvent)
      // },
      onUploadProgress: function(progressEvent) {
        debugger
      // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(progressEvent)
      }
    }
  )
    .then((response) => {
      // console.log(response)
      alert(response.data);
      props.modalCallback(false);
      param.setFileName("");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default Upload;

// return(
//   <div className="upload ml-2 ml-md-3 ">
//     <label
//       htmlFor="file-upload"
//       className="nav-button"
//       >
//         Click to upload
//     </label>
//     <input
//       type="file"
//       className="d-none"
//       id="file-upload"
//       onChange={(e) => {
//         fileUpload(e,props);
//         setFileName(e.target.files[0].name);
//       }}
//     />
//     <div className="ml-2">
//       {fileName}
//     </div>
//   </div>
// );
