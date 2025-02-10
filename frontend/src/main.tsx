import { createRoot } from 'react-dom/client'
import { BrowserRouter,  Routes, Route } from "react-router";
import MainPage from "./routes/MainPage";
import Login from './routes/Login';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>,
)
