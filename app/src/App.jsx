import "./App.css";
import MenuBar from "./MenuBar.jsx";
import FileSpace from "./FileSpace.jsx";

import isTokenExpired from "./isTokenExpired.jsx";
//region app
console.log("App.jsx");

function App() {
  //token checking not working i guess
  const token = localStorage.getItem("access_token");
  console.log(token);
  if (token) {
    if (isTokenExpired(token)) {
      console.log("Token wygasł, użytkownik musi się ponownie zalogować");
      // Przeprowadź proces odświeżenia tokenu lub wyloguj użytkownika
    } else {
      console.log("Token jest nadal ważny");
      // Możesz kontynuować operacje wymagające uwierzytelnienia
    }
  } else {
    console.log("Brak tokenu, użytkownik nie jest zalogowany");
  }
  return (
    <>
      <MenuBar></MenuBar>
      <FileSpace></FileSpace>
    </>
  );
}
//end region
export default App;
