import { data } from "react-router-dom";
import api from "./api.tsx";

export const DevBaseUrl = "http://localhost:5000";

export const createUserApi = async (data: any) => {
  console.log("createUserApi url", `${DevBaseUrl}/api/auth/signup`);
  const url = `${DevBaseUrl}/api/auth/signup`;
  const method = "POST";
  console.log("create User url --", url);
  console.log("create User url --data--", data);
  const res = await api(url, method, false, data, false);
  return res;
};

export const loginApi = async (data: any) => {
  console.log("loginApi url", `${DevBaseUrl}/api/auth/login`);
  const url = `${DevBaseUrl}/api/auth/login`;
  const method = "POST";
  const res = await api(url, method, false, data, false);
  return res;
};

export const getAllUserNotes = async (data: any) => {
  console.log("getAllUserNotes url", `${DevBaseUrl}/api/notes/getAllNotes/`);
  const url = `${DevBaseUrl}/api/notes/getAllNotes/`;
  const method = "GET";
  const res = await api(url, method, true, data, false);
  return res;
};

export const updateNotesApi = async (id: any, data: any) => {
  console.log(
    "getAllUserNotes url",
    `${DevBaseUrl}/api/notes/updateNote/${id}`
  );
  const url = `${DevBaseUrl}/api/notes/updateNote/${id}`;
  const method = "PUT";
  const res = await api(url, method, true, data, false);
  return res;
};

export const createNoteApi = async (data: any) => {
  console.log("getAllUserNotes url", `${DevBaseUrl}/api/notes/create`);
  const url = `${DevBaseUrl}/api/notes/create`;
  const method = "POST";
  const res = await api(url, method, true, data, false);
  return res;
};

export const deleteNoteApi = async (id: any) => {
  console.log(
    "getAllUserNotes url",
    `${DevBaseUrl}/api/notes/deleteNote/${id}`
  );
  const url = `${DevBaseUrl}/api/notes/deleteNote/${id}`;
  const method = "DELETE";
  const res = await api(url, method, true, data, false);
  return res;
};
