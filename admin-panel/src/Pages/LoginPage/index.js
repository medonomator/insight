import React from 'react';
import { Button, Box, Input, FormGroup } from '@material-ui/core';
import styles from './LoginPage.module.sass';
import api from '../../helpers/api';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import { setToken, getToken } from '../../helpers/token';
import { withRouter } from 'react-router-dom';

const LoginPage = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (getToken()) {
      const fetchAuth = async () => {
        const data = await api('user/auth', 'GET');
        if (data.status === 200) history.push('admin');
      };
      fetchAuth();
    }
  }, []);

  const auth = () => {
    api('/user/login', 'POST', { email, password })
      .then(res => {
        setToken(res.data.token);
        setAuthorizationToken(res.data.token);
        history.push('admin');
      })
      .catch(error => console.log(error));
  };
  return (
    <div className={styles.loginPage}>
      <Box className={styles.box} boxShadow={3}>
        Авторизация
        <FormGroup className={styles.formGroup}>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            className={styles.input}
            autoFocus
            placeholder="email"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            value={password}
            className={styles.input}
            placeholder="password"
          />
        </FormGroup>
        <Button onClick={auth} disabled={email.length < 4 || password.length < 4} variant="contained" color="primary">
          Войти
        </Button>
      </Box>
    </div>
  );
};

export default withRouter(LoginPage);
