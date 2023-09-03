const { publicRequest } = require("../lib/requestMethods");

export const getData = async (url) => {
  try {
    const resp = await publicRequest.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
