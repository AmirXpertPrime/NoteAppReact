import axios from "axios";


export default async (
  url,
  method,
  token = false,
  body = {},
  isFormData = false
) => {
  let headers;
  if (isFormData) {
    console.log("FormData True");
    headers = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    }

    // if (token) {
    //   const userToken = await AsyncStorage.getItem("@AuthToken");
    //   // console.log('User Token For Api', userToken);
    //   headers["Authorization"] = `Bearer ${userToken}`;
    // }

    const structure = {
      url,
      method,
      headers,
      timeout: 30000,
    };

    if (method === "GET") {
      structure.params = body;
    } else {
      structure.data = body;
    }

    console.log("API Request:", { url, method, headers, body });

    return axios(structure)
      .then((resp) => {
        // console.log('API Success Response:', resp.status, resp.data);
        return {
          success: true,
          status: resp.status,
          data: resp.data,
        };
      })
      .catch((err) => {
        console.log("Eror Api Name:", url);
        console.log("API Error:", err.message);
        console.log("API Error Response:", err?.response?.data);
        console.log("API Error Status:", err?.response?.status);

        const errorResponse = err?.response;

        return {
          success: false,
          status: errorResponse?.status || 500,
          data: {
            message:
              errorResponse?.data?.message ||
              err.message ||
              "An unknown error occurred",
          },
        };
      });
  }
};
