import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import TmpGetFiles from "./tmpGetFiles";

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
  return (
    <div className="file-space">
      {/* <FileCard></FileCard> */}

      <div>
        <h1>Files</h1>
        <ul>
          {files.map((file, index) => (
            <a href={file.url} key={index}>
              <li>{file.key}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FileSpace;
