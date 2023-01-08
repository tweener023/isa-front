import React from 'react';
import "./login.scss"



const LoginPage = () => {
  return (
    <div className="login-container" id = "login">
      <div className="card">
        <div className="card-body">
          <form>
            <h1 className = "h11">Login</h1>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;