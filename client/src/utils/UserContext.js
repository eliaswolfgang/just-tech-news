import React, { createContext, useReducer, useContext } from 'react';

const UserContext = createContext({
  user: {},
});
const { Provider } = UserContext;

const userReducer = (state, action) => {
  switch (action.type) {
    case 'setCurrentUser':
      return [...state, { user: action.payload }];
    case 'logout':
      return [...state, { user: action.payload }];
    default:
      return state;
  }
};

const UserProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(userReducer, []);
  return <Provider value={{ state, dispatch }} {...props} />;
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
