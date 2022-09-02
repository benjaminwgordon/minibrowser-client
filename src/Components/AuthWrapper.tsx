import { ChildProcess } from 'child_process';
import React, { useEffect } from 'react';
import { useState } from "react"
import LoginForm from "./LoginForm"

type AuthWrapperProps = {
  children: React.ReactNode
}

const AuthWrapper = (props: AuthWrapperProps) => {
  const [jwt, setJwt] = useState("")

  useEffect(()=> {console.log({jwt})}, [jwt])

  return (
    <div>
      {jwt === ""
        ? <LoginForm setJwt={setJwt}/>
        : <input type="button" value="logout" onClick={()=> setJwt("")}/>
      }
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default AuthWrapper