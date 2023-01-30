import { useState, useReducer } from 'react';
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

export const Signup = () => {
  const initialSignUpState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const updateForm = (e, key) => {
    dispatch({
      type: 'update',
      payload: {
        [key]: e.target.value,
      },
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isValid =
      state.username &&
      state.email &&
      state.password &&
      state.confirmPassword &&
      state.password === state.confirmPassword;

    if (!isValid) {
      e.stopPropagation();
      return;
    }

    API.createUser(state)
      .then((res) => {
        userDispatch({
          type: 'setCurrentUser',
          payload: {
            username: res.data.username,
            id: res.data.id,
            email: res.data.email,
            loggedIn: true,
          },
        });
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            loggedIn: true,
          })
        );
        navigate('/home');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setErrorProps({
            open: true,
            message: `${err.message}`,
          });
        }
      });
  };

  const [state, dispatch] = useReducer(formReducer, initialSignUpState);
  const [submitted, setSubmitted] = useState(false);
  const [errorProps, setErrorProps] = useState({
    open: false,
    setOpen: null,
    message: '',
  });
  const { dispatch: userDispatch } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className='text-center'>
          <h3>Sign up below to start posting!</h3>
        </div>
        <Box component='form' noValidate onSubmit={handleSignup} width='50%'>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => updateForm(e, 'username')}
                label='Username'
                variant='filled'
                value={state.username}
                error={submitted && !state.username}
                required
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => updateForm(e, 'email')}
                label='Email'
                variant='filled'
                type='email'
                value={state.email}
                error={submitted && !state.email}
                required
                helperText={
                  errorProps.open
                    ? 'A user with email address already exists. Please enter a unique email address.'
                    : ''
                }
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => updateForm(e, 'password')}
                variant='filled'
                label='Password'
                type='password'
                value={state.password}
                error={
                  (submitted && !state.password) ||
                  (submitted && state.password !== state.confirmPassword)
                }
                required
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                onChange={(e) => updateForm(e, 'confirmPassword')}
                variant='filled'
                label='Confirm Password'
                type='password'
                value={state.confirmPassword}
                error={
                  (submitted && !state.confirmPassword) ||
                  (submitted && state.password !== state.confirmPassword)
                }
                required
              />
            </FormControl>
          </FormGroup>
          <Button type='submit'>Sign Up</Button>
        </Box>
      </Container>
      <ErrorToast props={errorProps} />
    </>
  );
};

export default Signup;
