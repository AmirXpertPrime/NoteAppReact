import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export default async (
  url: any,
  method: any,
  token: boolean | false = false,
  body = {},
  isFormData = false
): Promise<any> => {
  // Cookie-based auth: browser will attach the JWT cookie automatically when `withCredentials: true` is set.
  // Do NOT read tokens from localStorage here.
  const headers: Record<string, string> = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      };

  // Back-compat: keep the `token` flag in the signature, but it no longer injects Authorization headers.
  // If your backend still expects `Authorization: Bearer ...`, switch it back OR pass a token explicitly.
  void token;

  const structure: AxiosRequestConfig = {
    url,
    method,
    headers,
    timeout: 30000,
    withCredentials: true,
  };

  if (method === "GET") {
    structure.params = body;
  } else {
    structure.data = body;
  }

  console.log("API Request All params:", { url, method, headers, body });

  return axios(structure)
    .then((resp) => {
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
};
