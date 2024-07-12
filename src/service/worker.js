import http from "./config";
const worker = {
  create: data => http.post("/worker", data),
  get: () => http.get("/workers", { params: { page: 1, limit: 10 } }),
  update: data => http.put("/worker", data),
  delete: id => http.delete(`/worker/${id}`),
};
export default worker;
