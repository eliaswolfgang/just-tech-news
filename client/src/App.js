import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import NavBar from './components/Navbar';
import { UserProvider } from './utils/UserContext';
import { PostsProvider } from './utils/PostsContext';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
