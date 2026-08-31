import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from '@/hooks/useLang'
import { AuthProvider } from '@/hooks/useAuth'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import OwnerLogin from '@/pages/OwnerLogin'
import OwnerDashboard from '@/pages/OwnerDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route path="/" element={
              <>
                <Nav />
                <Home />
                <Footer />
              </>
            } />

            {/* Owner portal */}
            <Route path="/owners/login" element={<OwnerLogin />} />
            <Route path="/owners" element={<OwnerDashboard />} />

            {/* Admin portal */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  )
}
