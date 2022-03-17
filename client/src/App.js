import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import { UserProvider } from './utils/UserContext';
import Signup from './components/Signup';
import Landing from './pages/Landing';

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/home' element={<Landing />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
