const PROD = process.env.NODE_ENV === "production";
console.log("root api url: ", process.env.REACT_APP_PROD_API_ROOT_URL);
const constants = {
  baseURL: PROD
    ? process.env.REACT_APP_PROD_API_ROOT_URL
    : "http://localhost:3333",
};

export default constants;
