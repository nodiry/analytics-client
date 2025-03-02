import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './auth/SignIn.tsx';
import SignUp from './auth/SignUp.tsx';
import TwoAuth from './auth/TwoAuth.tsx';
import Dashboard from './dashboard/Dashboard.tsx';
import UnAvailable from './errors/404.tsx';
import Metric from './metrics/metric.tsx';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/twoauth" element={<TwoAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/metrics/:id/:period" element={<Metric />} />
        <Route path="*" element={<UnAvailable />} /> {/* Catch-all route */}
      </Routes>
    </Router>
    </ThemeProvider>
  </StrictMode>,
)
