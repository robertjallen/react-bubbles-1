import React, {useState} from "react";
import api from '../utils/api'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [error, setError] = useState()
  const [data, setData] = useState({
    username: "",
    password: "",
  }) 

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    api()
    .post('/api/login', data)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => {
      setError(err.response.data.error)
      console.log(err.response.data.error)
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
