const { publicRequest } = require("../lib/requestMethods");

export const postData = async (url, data) => {
  try {
    const resp = await publicRequest.post(url, { ...data });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
