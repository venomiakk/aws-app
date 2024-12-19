import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import TmpGetFiles from "./tmpGetFiles";
import { v4 as uuid } from "uuid";
import axios from "axios";

const logs_endpoint = import.meta.env.VITE_LOGS_API;

function FileSpace() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesList = await TmpGetFiles();
        setFiles(filesList);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchFiles();
  }, []);
  const handleClick = (file) => {
    console.log("File clicked:", file);
    const log_item = {
      log_id: uuid(),
      username: "user",
      action: "file download",
      description: `downloaded file: ${file.key}`,
    };

    axios.post(logs_endpoint, log_item).then(() => {
      console.log(log_item);
    });
  };

  return (
    <div className="file-space">
      {/* <FileCard></FileCard> */}

      <div>
        <h1>Files</h1>
        <ul>
          {files.map((file, index) => (
            <a href={file.url} key={index} onClick={() => handleClick(file)}>
              <li>{file.key}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FileSpace;
