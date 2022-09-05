import React from 'react'
import { AuthState } from '../types'
import {reducer} from './reducer'

const initialState: AuthState = {jwt: ""}

export const AuthContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {

  const [state, dispatch] = React.useReducer(reducer, initialState)
  
  return (
    <AuthContext.Provider value={{state, dispatch: () => null }} {...props}/>
  )
}