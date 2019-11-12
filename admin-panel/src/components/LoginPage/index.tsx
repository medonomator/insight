import React from 'react';
import { Button, Box, Input, FormGroup } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../helpers/api';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import { setToken, getToken } from '../../helpers/token';
import styles from './LoginPage.module.sass';

const LoginPage = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const MIN_LENGTH = 4;

  React.useEffect(() => {
    if (getToken()) {
      const fetchAuth = async () => {
        try {
          const data: AxiosResponse = await api('user/auth', 'GET');
          if (data.status === 200) history.push('admin');
        } catch (error) {
          // TODO: need throw error to global state `Errors`
          console.log(error);
        }
      };
      fetchAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = () => {
    // TODO: remake on await as above
    api('/user/login', 'POST', { email, password })
      .then((res: AxiosResponse) => {
        setToken(res.data.token);
        setAuthorizationToken(res.data.token);
        history.push('admin');
      })
      .catch(error => {
        // TODO: need throw error to global state `Errors`
        console.log(error);
      });
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
        <Button
          onClick={auth}
          disabled={email.length < MIN_LENGTH || password.length < MIN_LENGTH}
          variant="contained"
          color="primary"
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};

export default withRouter(LoginPage);
