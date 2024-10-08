import './App.css';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ProfilePage } from './pages/Profile';
import { AdminPage } from './pages/Admin';
import { ExceptionPage } from './pages/Exceptions';
import { AuthGaurd } from './guards/auth.gaurd';
import { Role } from './models/User';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile"
            element={
              <AuthGaurd roles={[Role.ADMIN, Role.USER]}>
                <ProfilePage />
              </AuthGaurd>
            }
          />
          <Route path="/admin" 
            element={
              <AuthGaurd roles={[Role.ADMIN]}>
                <AdminPage />
              </AuthGaurd>
            } 
          />
          <Route path="/not-found" element={<ExceptionPage />} />
          <Route path="/unauthorized" element={<ExceptionPage />} />
          <Route path="*" element={<ExceptionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
