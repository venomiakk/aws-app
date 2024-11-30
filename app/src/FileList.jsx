import React, { useState } from "react";
import s3 from "./AWSConfig";
import AWS from "aws-sdk";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const listFiles = async () => {
    const params = {
      Bucket: "spc-filebucket", // Nazwa bucketu
      Prefix: "data/", // Opcjonalnie ścieżka folderu w bucketcie
    };

    try {
      console.log(AWS.config.credentials);
      const response = await s3.listObjectsV2(params).promise();
      const fileList = response.Contents.map((file) => ({
        key: file.Key,
        url: `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${file.Key}`,
      }));
      setFiles(fileList);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <div>
      <button onClick={listFiles}>Pobierz pliki</button>
      <ul>
        {files.map((file) => (
          <li key={file.key}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
