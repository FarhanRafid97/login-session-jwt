import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    refreshToken();
    getUser();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:8010/token');
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);

      setName(decode.name);
      setExpire(decode.exp);
    } catch (error) {
      if (error) {
        navigate('/');
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:8010/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        setName(decode.name);
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUser = async () => {
    const response = await axiosJWT.get('http://localhost:8010/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
    console.log(users);
  };

  return (
    <>
      <div className="container mt-5">
        <p>dashboard {name}</p>
        <button onClick={getUser}>Get usre</button>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
