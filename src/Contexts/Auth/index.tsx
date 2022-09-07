import React, { createContext, useState } from 'react'

interface IAuthContext{
  jwt: string
  updateJwt: (newJwt:string) => void
}

export const AuthContext = createContext<IAuthContext>({jwt:"", updateJwt: ()=>{}});

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
  const [jwt, setJwt] = useState("")
  const updateJwt = (newJwt: string) => {
    console.log('updated global jwt' + newJwt)
    setJwt(newJwt)
  }

  return (
    <AuthContext.Provider value={{jwt, updateJwt }}>
      {props.children}
    </AuthContext.Provider>
  )
}