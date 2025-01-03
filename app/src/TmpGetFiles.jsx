import AWS from "aws-sdk";

const APPCLIENTID = import.meta.env.VITE_COGNITO_APPCLIENT_ID;
const IDENTITYPOOLID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USERPOOLID = import.meta.env.VITE_USER_POOL_ID;

const TmpGetFiles = () => {
  AWS.config.region = "eu-central-1"; // Wybierz region S3, np. 'eu-central-1'
  // TODO with USER_PASSWORD_AUTH AuthFlow there will be need to create login form i guess
  // region login
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH", // Użyj odpowiedniego flow, np. 'USER_PASSWORD_AUTH'
    ClientId: APPCLIENTID, // App Client ID z Twojego Cognito User Pool
    AuthParameters: {
      USERNAME: "test1", // Nazwa użytkownika
      PASSWORD: "Test123#", // Hasło użytkownika
    },
  };

  return new Promise((resolve, reject) => {
    cognito.initiateAuth(params, function (err, data) {
      if (err) {
        console.log("Error during authentication: ", err);
        reject(err);
      } else {
        // Zalogowany użytkownik, teraz uzyskaj poświadczenia z Identity Pool
        const idToken = data.AuthenticationResult.IdToken; // Uzyskaj token
        // console.log("ID Token: ", idToken);

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITYPOOLID, // Twój Identity Pool ID
          Logins: {
            [`cognito-idp.eu-central-1.amazonaws.com/${USERPOOLID}`]: idToken, // Token z User Pool
          },
        });
        // region authorization
        // Konfiguracja AWS SDK
        // Uzyskiwanie poświadczeń AWS
        AWS.config.credentials.get(function (err) {
          if (err) {
            console.log("Error getting credentials:", err);
            reject(err);
          } else {
            // console.log("AWS credentials:", AWS.config.credentials);
            // Teraz możesz uzyskać dostęp do S3
            // console.log("List files from s3");
            // end region
            const s3 = new AWS.S3();

            const params = {
              Bucket: "spc-filebucket", // Nazwa Twojego bucketu S3
              Prefix: "data/",
            };

            s3.listObjectsV2(params, function (err, data) {
              if (err) {
                console.log("Error fetching files: ", err);
                reject(err);
              } else {
                const files = data.Contents.map((file) => {
                  const url = s3.getSignedUrl("getObject", {
                    Bucket: params.Bucket,
                    Key: file.Key,
                  });
                  return { key: file.Key, url };
                });
                console.log("Files:", files);
                resolve(files);
              }
            });
          }
        });
      }
    });
  });

  //end region
};

export default TmpGetFiles;
