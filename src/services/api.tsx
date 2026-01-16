import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export default async (
  url: any,
  method: any,
  token: boolean | false = false,
  body = {},
  isFormData = false
): Promise<any> => {
  let headers: Record<string, string>;
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
    };

    if (token) {
      const jwtToken = localStorage.getItem("jwtAuthToken");
      console.log("Token from localStorage:", jwtToken);
      headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    const structure: AxiosRequestConfig = {
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

    console.log("API Request All params:", { url, method, headers, body });

    return axios(structure)
      .then((resp) => {
        //  console.log("API Success Response:", resp.status, resp.data);
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
