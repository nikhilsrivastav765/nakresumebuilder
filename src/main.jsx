import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResumeProvider } from "./context/ResumeContext.jsx";
import { AuthProvider } from './components/auth/AuthContext.jsx';
import { BrowserRouter, Router } from 'react-router';
createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <ResumeProvider>
    <App />
    </ResumeProvider>
    </AuthProvider>
)
