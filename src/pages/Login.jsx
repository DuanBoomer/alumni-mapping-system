import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState(false)

  useEffect(() => {
    console.log("useEffect", localStorage.getItem("userID"), typeof (localStorage.getItem("userID")));
    if (localStorage.getItem("userID")) {
      // console.log("true");
      navigate("/home")
    }
  }, [])

  function loginStudent(email, password){
    axios.get(`https://ams-backend-bdx5.onrender.com/student/${email}/${password}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/home")
          setErr(false)
          setEmail("")
          setPassword("")
          localStorage.setItem("userID", response.data.alumni);
          localStorage.setItem("studentID", response.data.email);
        } else {
          setErr(true)
        }
      })
      .catch((error) => {
        setErr(true)
        console.log(error);
      })
  }

  function handleClick() {
    // console.log("clicked");
    axios.get(`https://ams-backend-bdx5.onrender.com/alumni/${email}/${password}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/home")
          setErr(false)
          setEmail("")
          setPassword("")
          localStorage.setItem("userID", response.data.email);
        }
        else {
          loginStudent(email, password)
          setErr(true)
          
        }
      })
      .catch((error) => {
        loginStudent(email, password)
        setErr(true)
        console.log(error);
      });
  }

  return (
    <div style={{ padding: "1em 1em 3em 1em", display: "flex", flexDirection: "column" }}>
      <Header text={'Login'} />
      <InputField title={"Email"} placeholder={"enter your email"} type={"email"} state={email} setState={setEmail} />
      <InputField title={"Password"} placeholder={"something secret"} type={"password"} state={password} setState={setPassword} />
      {
        err
          ? <p style={{ color: "red", fontSize: "var(--font-size-sm)" }}>email or password incorrect</p>
          : <></>
      }
      <Button text={"Login"} type={"light"} size={"big"} onClick={handleClick} />
    </div>
  )
}

export default Login
