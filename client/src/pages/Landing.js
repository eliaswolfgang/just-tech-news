import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/UserContext';


export const Landing = () => {
  const { state } = useUserContext();
  const { user } = state[0] ?? {};

  return (
    <>{user && <div>This will be the landing page for {user.username}</div>}</>
  );
};

export default Landing;
