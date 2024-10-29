import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
}

export default Home;