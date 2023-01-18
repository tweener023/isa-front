import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(
    username,
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    zipCode,
    country,
    phoneNumber,
    jmbg,
    gender,
    job,
    workplace,
    pointsCollected
  ) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      zipCode,
      country,
      phoneNumber,
      jmbg,
      gender,
      job,
      workplace,
      pointsCollected,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
