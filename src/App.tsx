import React from 'react';
import './App.css';
import AuthWrapper from './Components/AuthWrapper';
import Feed from './Components/Feed';

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <Feed/>
      </AuthWrapper>
    </div>
  );
}

export default App;
