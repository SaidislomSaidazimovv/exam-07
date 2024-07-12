import http from "./config";
const category = {
  create: data => http.post("/category", data),
  get: () => http.get("/categories", { params: { page: 1, limit: 10 } }),
  update: data => http.put("/category", data),
  delete: id => http.delete(`/category/${id}`),
};
export default category;
