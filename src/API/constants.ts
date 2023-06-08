const PROD = process.env.NODE_ENV === "prod";
console.log("process_env: ", process.env.NODE_ENV);

console.log("root url: ", process.env.PROD_API_ROOT_URL);
const constants = {
  baseURL: PROD ? process.env.PROD_API_ROOT_URL : "http://localhost:3333",
};

export default constants;
