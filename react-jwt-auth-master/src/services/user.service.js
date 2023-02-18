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

  getAppointmentsByFacility(centerId, token) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return axios.get(`http://localhost:8080/api/appointments/facility/${centerId}`, {headers});
  }

  static getNewAppointment(date) {
    const currentUser = localStorage.getItem("user");
    const token = currentUser.token;
    return axios.post("http://localhost:8080/api/appointments/", date, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}

export default new UserService();
