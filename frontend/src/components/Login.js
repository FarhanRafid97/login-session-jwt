import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [msg, setMsg] = useState('');

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8010/login', {
        email,
        password,
      });
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={submitRegister} className="box">
                {msg ? <label>{msg}</label> : ''}
                <div className="field">
                  <label className="label">Email</label>
                  <input
                    class="input is-dark"
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <input
                    class="input is-dark"
                    type="text"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="field mt-5">
                  <button className="button is-dark is-fullwidth">Login</button>
                </div>
                <div className="field mt-5">
                  <Link to="/register" class="button is-dark is-fullwidth">
                    Dont Have Accout?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
