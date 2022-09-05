import { useState } from "react"
import login from "../API/login"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {

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