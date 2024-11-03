import { useEffect, useState } from "react";
// need to install this, for now unusable
import { CognitoUserPool } from "amazon-cognito-identity-js";

const clientID = import.meta.env.VITE_CLIENT_ID;
const userPoolID = import.meta.env.VITE_USER_POOL_ID;

const poolData = {
  UserPoolId: userPoolID,
  ClientId: clientID,
};

const userPool = new CognitoUserPool(poolData);

const UserData = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = userPool.getCurrentUser();

    if (user) {
      user.getSession((err, session) => {
        if (err) {
          console.error(err);
          return;
        }
        const username = user.getUsername();
        setUsername(username);
      });
    } else {
      console.log("Brak zalogowanego użytkownika");
    }
  }, []);

  return (
    <div>
      {username ? (
        <p>Zalogowany jako: {username}</p>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </div>
  );
};

export default UserData;
