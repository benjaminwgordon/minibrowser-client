import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostFeed from "./Components/PostFeed";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Contexts/Auth/index";
import NoRoute from "./Components/NoRoute";
import Posts from "./Components/Posts";
import AuthFlow from "./Components/AuthFlow";
import SignupForm from "./Components/SignupForm";
import PrivateOutlet from "./Components/PrivateOutlet";
import User from "./Components/User";
import UserProfile from "./Components/UserProfile";
import "./App.css";
import PostDetail from "./Components/PostDetail/PostDetail";
import SignupConfirmation from "./Components/EmailValidation/SignupConfirmation";
import EmailValidationSuccess from "./Components/EmailValidation/EmailValidationSuccess";
import SidebarNav from "./Components/SidebarNav";
import Nav from "./Components/Nav";
import TopTags from "./Components/TopTags";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* The auth path is visible to all users regardless of auth status */}
          <Route path="/auth" element={<AuthFlow />}>
            <Route index element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="confirm" element={<SignupConfirmation />} />
            <Route
              path="emailConfirmationSuccess"
              element={<EmailValidationSuccess />}
            />
          </Route>
          <Route path="/" element={<Nav />}>
            {/* All routes in this block are accessible only to authed users */}
            <Route path="post" element={<PrivateOutlet />}>
              <Route path="" element={<Posts />}>
                <Route path="feed" element={<PostFeed />}>
                  <Route path="post/:postId" element={<PostDetail />} />
                </Route>
                <Route path="*" element={<NoRoute />} />
              </Route>
            </Route>
            <Route path="user" element={<User />}>
              <Route path=":username" element={<UserProfile />}>
                <Route path="post/:postId" element={<PostDetail />} />
              </Route>
            </Route>

            <Route path="tag" element={<TopTags />}></Route>

            {/* Invalid route catch block */}
            <Route path="/*" element={<PrivateOutlet />}>
              <Route index element={<Navigate to="noRoute" replace />} />
              <Route path="noRoute" element={<NoRoute />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
