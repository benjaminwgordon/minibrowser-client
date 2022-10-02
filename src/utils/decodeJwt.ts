export default function decodeJWT(jwt: string): { iat: number; exp: number } {
  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const decodedToken = JSON.parse(jsonPayload);
  decodedToken.iat = parseInt(decodedToken.iat);
  decodedToken.exp = parseInt(decodedToken.exp);
  return decodedToken;
}
