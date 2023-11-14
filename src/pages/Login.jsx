import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../back/Login';

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  function handleClick(){
    var loggedIn = login(email, password)

    // dev code (comment when pushing)
    // navigate("/home", {state: {userID: "123"}})
    // onLogin(true, "123")

    // actual code
    if (loggedIn.response){ navigate("/home", {state: {userID: loggedIn.userID}}) }
    onLogin(loggedIn.response, loggedIn.userID)
  }

  return (
    <div style={{ padding: "1em 1em 3em 1em", display: "flex", flexDirection: "column" }}>
      <Header text={'Login'} />
      <InputField title={"Email"} placeholder={"enter your email"} state={email} setState={setEmail}/>
      <InputField title={"Password"} placeholder={"something secret"} type={"password"} state={password} setState={setPassword} />
      <Button text={"Login"} type={"light"} size={"big"} onClick={handleClick} />
    </div>
  )
}

export default Login
