import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./routes/MainPage";
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
