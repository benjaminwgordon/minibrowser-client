import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Feed from './Components/Feed';
import LoginForm from './Components/LoginForm';
import { AuthProvider } from './Contexts/Auth/index';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />}/>
            <Route path="/feed" element={<Feed/>} />
          </Routes>
          {/* <Feed/> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
