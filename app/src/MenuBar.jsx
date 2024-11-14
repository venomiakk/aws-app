import LoginButton from "./LoginButton";
import LoginHandler from "./LoginHandler";

function MenuBar() {
  return (
    <div className="menu-bar">
      <LoginHandler></LoginHandler>
      <LoginButton></LoginButton>
      {/* <a href="https://spclogin.auth.eu-central-1.amazoncognito.com">Logout</a> */}
      <button>Upload file</button>
      
    </div>
  );
}

export default MenuBar;
