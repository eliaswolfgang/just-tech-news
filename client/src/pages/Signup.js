import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';
// import API from '../utils/API';
import { useMutation } from '@apollo/client';
import { createNewUser } from '../utils/mutations';
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
  const [createUser] = useMutation(createNewUser);
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

    try {
      const { data } = await createUser({
        variables: {
          username: state.username,
          email: state.email,
          password: state.password,
        },
      });
      userDispatch({
        type: 'setCurrentUser',
        payload: {
          username: data.createUser.username,
          email: data.createUser.email,
          loggedIn: true,
          id: data.createUser.id,
        },
      });

      sessionStorage.setItem(
        'user',
        JSON.stringify({
          username: data.createUser.username,
          email: data.createUser.email,
          loggedIn: true,
          id: data.createUser.id,
        })
      );
      navigate('/home');
    } catch (err) {
      console.log(err);
      setErrorProps({
        open: true,
        message: `Well, this is embarrassing... There was an issue signing you up. Please try again later.`,
      });
    }
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
