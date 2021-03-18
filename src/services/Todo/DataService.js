import http from "../../http-common";


class DataService {
  getAll() {
    return http.get("/task");
  }

  get(id) {
    return http.get(`/task/${id}`);
  }

  create(data) {
    return http.post("/task", data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }
  
  findByStatus(status) {
    return http.get(`/task?completed=${status}`);
  }
}

export default new DataService();
