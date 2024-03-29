import React, { createContext, useReducer, useContext } from 'react';

const UserContext = createContext({
  user: JSON.parse(sessionStorage.getItem('user')) ?? {},
});
const { Provider } = UserContext;

const userReducer = (state, action) => {
  switch (action.type) {
    case 'setCurrentUser':
      state.user = action.payload;
      return state;
    case 'logout':
      return (state = action.payload);
    default:
      return state;
  }
};

const UserProvider = ({ value = {}, ...props }) => {
  const initUser = { user: JSON.parse(sessionStorage.getItem('user')) };
  const [state, dispatch] = useReducer(userReducer, initUser ?? {});
  return <Provider value={{ state, dispatch }} {...props} />;
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
