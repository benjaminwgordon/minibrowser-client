export default function getJwtCookie() {
  const decodedCookie = decodeURIComponent(document.cookie);
  console.log({ decodedCookie });
  const cookies = decodedCookie.split(";");
  for (const cookie of cookies) {
    const key = cookie.split("=")[1];
    const val = cookie.split("=")[1];
    console.log({ key, val });
  }
}
