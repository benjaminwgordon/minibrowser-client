const PROD = process.env.NODE_ENV == "prod";

const constants = {
  baseURL: PROD ? "ampURL" : "http://localhost:3333",
};

export default constants;
