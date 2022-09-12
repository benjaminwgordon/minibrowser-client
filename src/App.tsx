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
import AuthGuard from "./Components/PrivateOutlet";
import PostFeed from "./Components/PostFeed";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Contexts/Auth/index";
import NoRoute from "./Components/NoRoute";
import NewPostForm from "./Components/NewPostForm";
import NavBar from "./Components/NavBar";
import Posts from "./Components/Posts";
import AuthFlow from "./Components/AuthFlow";
import SignupForm from "./Components/SignupForm";
import PrivateOutlet from "./Components/PrivateOutlet";
import User from "./Components/User";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* The auth path is visible to all users regardless of auth status */}
            <Route path="/auth" element={<AuthFlow />}>
              <Route index element={<LoginForm />} />
              <Route path="signup" element={<SignupForm />} />
            </Route>

            {/* All routes in this block are accessible only to authed users */}
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="post" element={<Posts />}>
                <Route index element={<Navigate to="feed" replace />} />
                <Route path="feed" element={<PostFeed />} />
                <Route path="new" element={<NewPostForm />} />
                <Route path="*" element={<NoRoute />} />
              </Route>
              <Route path="user" element={<User />}>
                <Route path=":id" element={<UserProfile />} />
                <Route path="me" element={<UserProfile />} />
              </Route>
            </Route>

            {/* Invalid route catch block */}
            <Route
              path="/*"
              element={
                <PrivateOutlet>
                  <NoRoute />
                </PrivateOutlet>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
