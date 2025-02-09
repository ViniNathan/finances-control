import { createRoot } from 'react-dom/client'
import { BrowserRouter,  Routes, Route } from "react-router";
import MainPage from "./routes/MainPage";
import './index.css'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
  </BrowserRouter>,
)
