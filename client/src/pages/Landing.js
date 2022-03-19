export const Landing = () => {
  const user = JSON.parse(sessionStorage.getItem('user')) ?? null;

  return (
    <>{user && <div>This will be the landing page for {user.username}</div>}</>
  );
};

export default Landing;
