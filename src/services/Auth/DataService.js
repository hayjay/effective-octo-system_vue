import http from "../../http-common";


class DataService {

  register(data) {
    return http.post("/user/register", data);
  }

  login(data) {
    return http.post("/user/login", data);
  }
}

export default new DataService();
