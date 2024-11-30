import * as jwt_decode from 'jwt-decode';

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; // JWT zawiera czas w sekundach, więc mnożymy przez 1000, aby uzyskać milisekundy
    const currentTime = new Date().getTime();

    return currentTime >= expirationTime;
  } catch (e) {
    console.error("Błąd dekodowania tokenu:", e);
    return true; // Jeśli wystąpił błąd, traktujemy token jako wygasły
  }
};

export default isTokenExpired;
