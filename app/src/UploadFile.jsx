import React, { Component } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const upload_endpoint = import.meta.env.VITE_LAMBDA_S3_UPLOAD;
const logs_endpoint = import.meta.env.VITE_LOGS_API;

class UploadFile extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
    filename: null,
    filecontent: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      this.setState({ filecontent: e.target.result });
    };
    // reader.readAsArrayBuffer(event.target.files[0]);
    console.log(this.state.filecontent);
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const binFile = {
      filename: this.state.filename,
      filecontent: this.state.filecontent,
    };
    console.log(binFile);

    //api call
    axios.post(upload_endpoint, formData).then(() => {
      console.log(this.state.selectedFile);
      this.setState({ selectedFile: null });
      this.setState({ fileUploadedSuccessfully: true });
    });
    console.log(formData);

    //* logs
    const log_item = {
      log_id: uuid(),
      username: "user",
      action: "file upload",
      description: `uploaded file: ${this.state.selectedFile.name}`,
    };

    axios.post(logs_endpoint, log_item).then(() => {
      console.log(log_item);
    });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h3>File details:</h3>
          <p>File name: {this.state.selectedFile.name}</p>
          <p>File type: {this.state.selectedFile.type}</p>
          <p>
            Last modified: {""}
            {new Date(this.state.selectedFile.lastModified).toDateString()}
          </p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>File uploaded successfully</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>No file selected</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.onFileChange} />
        <button onClick={this.onFileUpload}>Upload</button>
        {this.fileData()}
      </div>
    );
  }
}

export default UploadFile;
