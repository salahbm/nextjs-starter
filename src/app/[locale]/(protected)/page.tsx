import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <div className="container">
      <h1 className="typo-header">Welcome</h1>
      <p className="typo-body-1">You are logged in</p>
    </div>
  );
};

export default HomePage;
