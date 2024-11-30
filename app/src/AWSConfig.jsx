import AWS from "aws-sdk";
const IdentityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID;

AWS.config.update({
  region: "eu-central-1", // Region, w którym znajduje się bucket
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId, // ID puli tożsamości
  }),
});

const s3 = new AWS.S3();

// Wykonaj operację, np. pobierz listę plików
const params = { Bucket: "your-bucket-name" };

s3.listObjectsV2(params, function (err, data) {
  if (err) {
    console.log("Error fetching files: ", err);
  } else {
    console.log("Files: ", data);
  }
});

export default s3;
