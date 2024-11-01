import tmpFileImg from "./assets/document.png";

function FileCard() {
  return (
    <div className="file-card">
      <img className="file-card-img" src={tmpFileImg} alt="tmp alt text"></img>
      <h4 className="file-card-name">File name</h4>
    </div>
  );
}

export default FileCard;
