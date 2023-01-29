import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';
import API from '../utils/API';
import {
  Box,
  FormGroup,
  FormControl,
  Button,
  TextField,
  Container,
} from '@mui/material';
import ErrorToast from '../components/ErrorToast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { dispatch: userDispatch } = useUserContext();
  const [errorProps, setErrorProps] = useState({
    open: false,
    setOpen: null,
    message: '',
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isValid = email && password;

    if (!isValid) {
      e.stopPropagation();
      return;
    }

    API.login({ email, password })
      .then((res) => {
        if (res.statusCode === 401) {
          setErrorProps({
            open: true,
            message: 'Incorrect email or password',
          });
          return;
        }

        if (res.statusCode === 404) {
          setErrorProps({
            open: true,
            message:
              'No user with that email address found. Click on Just Tech News to sign up',
          });
          return;
        }

        userDispatch({
          type: 'setCurrentUser',
          payload: {
            username: res.data.user.username,
            email: res.data.user.email,
            loggedIn: true,
            id: res.data.user.id,
          },
        });

        sessionStorage.setItem(
          'user',
          JSON.stringify({
            username: res.data.user.username,
            email: res.data.user.email,
            loggedIn: true,
            id: res.data.user.id,
          })
        );
        navigate('/home');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setErrorProps({
            open: true,
            message: `Well, this is embarrassing... There was an issue signing you in. Please try again later.`,
          });
        }
      });
  };

  return (
    <>
      <Container>
        <div className='text-center'>
          <h3>Log in with your email address and password below:</h3>
        </div>
        <Box component='form' noValidate onSubmit={handleLogin} width='50%'>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                label='Email'
                variant='filled'
                type='email'
                value={email}
                error={submitted && !email}
                required
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant='filled'
                label='Password'
                type='password'
                value={password}
                error={submitted && !password}
                required
                helperText={
                  errorProps.open ? 'Incorrect email or password' : ''
                }
              />
            </FormControl>
          </FormGroup>
          <Button type='submit'>Log in</Button>
        </Box>
      </Container>
      <ErrorToast props={errorProps} />
    </>
  );
};

export default Login;
