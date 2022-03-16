import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './utils/UserContext';

function App() {
  return (
    <UserProvider>
      <div className='App'>This will be the app!</div>
    </UserProvider>
  );
}

export default App;
