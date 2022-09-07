import React from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AuthGuard from "./Components/AuthGuard";
import PostFeed from "./Components/PostFeed";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Contexts/Auth/index";
import NoRoute from "./Components/NoRoute";
import NewPostForm from "./Components/NewPostForm";
import NavBar from "./Components/NavBar";
import Posts from "./Components/Posts";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AuthGuard>
            <NavBar />
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/post" element={<Posts />}>
                <Route index element={<Navigate to="feed" replace />} />
                <Route path="feed" element={<PostFeed />} />
                <Route path="new" element={<NewPostForm />} />
                <Route path="*" element={<NoRoute />} />
              </Route>
              {/* testing protected routes */}
              {/* <ProtectedRoute path="/user" element={<Feed/>}/> */}
              <Route path="*" element={<NoRoute />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
