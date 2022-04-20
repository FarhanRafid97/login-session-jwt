import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8010/users', {
        name,
        email,
        password,
        conPassword,
      });
      setMsg('Data Berhasil Di Tambahkan');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    clear();
  };
  const clear = () => {
    setName('');
    setEmail('');
    setConPassword('');
    setPassword('');
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={submitRegister}>
                {msg ? <label>{msg}</label> : ''}
                <div className="field">
                  <label className="label">Username</label>
                  <input
                    className="input is-dark"
                    type="text"
                    name="username"
                    placeholder="Ussername"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <input
                    className="input is-dark"
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
                    className="input is-dark"
                    type="text"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <input
                    className="input is-dark"
                    type="text"
                    name="conPassword"
                    placeholder="Confirm assword"
                    autoComplete="off"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  ></input>
                </div>
                <div className="field mt-5">
                  <button className="button is-dark is-fullwidth">
                    Register
                  </button>
                </div>
                <div className="field mt-5">
                  <Link to="/" className="button is-dark is-fullwidth">
                    Alredy have accout?
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

export default Register;
