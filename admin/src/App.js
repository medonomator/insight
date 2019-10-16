import React, { useEffect } from 'react';
import api from './helpers/api';

function App() {
  useEffect(() => {
    api('user/auth', 'POST', { email: 'email', password: 'password' })
      .then(res => {
        console.log('=============================');
        console.log('logging', res);
        console.log('=============================');
      })
      .catch(error => console.log(error));
  }, []);
  return <div className="App">aasdasdasds</div>;
}

export default App;
