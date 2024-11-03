const loginURL = import.meta.env.VITE_LOGIN_URL;

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = loginURL;
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
