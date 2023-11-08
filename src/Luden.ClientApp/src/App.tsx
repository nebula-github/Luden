import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/home'
import { Navbar } from './components/navbar'

const App = () => {
  return (
    <div className="text-foreground bg-background">
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<h1>404</h1>} />
          <Route path="app" element={<Navbar />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
