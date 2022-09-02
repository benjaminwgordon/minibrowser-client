import { useState } from "react"
import login from "../API/login"

type LoginFormProps = {
  setJwt: Function
}

const LoginForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
      try {
        const body = {
        email,
        password
      }
      const jwt = await login(body)
      if (jwt !== undefined && jwt.access_token !== undefined){
        props.setJwt(jwt.access_token)
      } else {
        console.log('invalid jwt:' + jwt)
      }
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div>
        <div>
            <label htmlFor="emailInput">Email</label>
            <input id="emailInput" type="text" value={email} onChange={event => setEmail(event.target.value)}/>
        </div>
        <div>
            <label htmlFor="passwordInput">Password</label>
            <input id="passwordInput" type="text" value={password} onChange={event => setPassword(event.target.value)}/>
        </div>
        <input type="submit" value="login" onClick={handleSubmit}/>
    </div>
  )
}

export default LoginForm