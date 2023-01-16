import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import { UserProvider } from './utils/UserContext';
import { PostsProvider } from './utils/PostsContext';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';

function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Landing />} />
          </Routes>
        </Router>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
