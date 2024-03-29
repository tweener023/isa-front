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
        console.log(response.data.token);
        console.log(response.data);
        if (response.data.token) {
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
    confirmPassword,
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
      confirmPassword,
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
  getJwt() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : null;
  }
  getCurrentUserId() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.id : null;
  }
}

export default new AuthService();
