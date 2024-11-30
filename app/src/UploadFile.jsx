import React, { Component } from "react";
import axios from "axios";
const upload_endpoint = import.meta.env.VITE_LAMBDA_S3_UPLOAD;

class UploadFile extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    //api call
    axios.post(upload_endpoint, formData).then(() => {
      this.setState({ selectedFile: null });
      this.setState({ fileUploadedSuccessfully: true });
    });
    console.log(formData);
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
