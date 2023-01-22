import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getMedicBoard() {
    return axios.get(API_URL + "medic", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getFacilityByMedic(medicId, token) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return axios.get(`http://localhost:8080/api/users/facility/${medicId}`, { headers }); // promeniti kad napravim ne BE metodu
  }
}

export default new UserService();
