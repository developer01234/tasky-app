import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);