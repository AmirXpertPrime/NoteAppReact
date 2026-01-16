declare module "./api" {
  const api: (
    url: any,
    method: any,
    token?: string | false,
    body?: any,
    isFormData?: boolean
  ) => Promise<any>;

  export default api;
}
