import React, { useContext } from 'react'
import { Route, Navigate} from 'react-router-dom'
import { AuthContext } from '../Contexts/Auth'
import { render } from '@testing-library/react';

type ProtectedRouteProps = {
    element: React.ReactNode,
    path: string

}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const {jwt} = useContext(AuthContext)
  const isLoggedIn = jwt !== undefined && jwt !== ""

  return (
    isLoggedIn 
        ? <Route path={props.path} element={props.element}/>
        : <Navigate to="/login"/>
    )

  
}

export default ProtectedRoute