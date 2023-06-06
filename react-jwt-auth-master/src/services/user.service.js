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
    return axios.get(`http://localhost:8080/api/users/facility/${medicId}`, { headers }); 
  }

  getAppointmentsByFacility(centerId, token) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return axios.get(`http://localhost:8080/api/appointments/facility/${centerId}`, {headers});
  }

   createNewAppointment(facilityId, appointment) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = currentUser.token;
    //const centerName = center.centerName;
    console.log("ovo je appointment "+ JSON.stringify(appointment));
    
    return axios.post("http://localhost:8080/api/appointments/" + facilityId + '/' + currentUser.id+'/addAppointment', appointment, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
  getAnalytics(centerId) {
    return axios.get(`http://localhost:8080/api/analytics/${centerId}/getAnalytics`, { headers: authHeader() });
  }
}

export default new UserService();
