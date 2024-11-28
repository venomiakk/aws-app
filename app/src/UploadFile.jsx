import React, { Component } from "react";
import axios from "axios";

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
    axios
      .post(
        // "https://cisg8jt5wi.execute-api.eu-central-1.amazonaws.com/prod/file-upload",
        "https://r6bvc7sve5urtosoxhkdmkb4fy0ayyqs.lambda-url.eu-central-1.on.aws",
        formData
      )
      .then(() => {
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
