import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import styles from './login.module.sass'
import { API } from '../../helpers/axios'
import { setAuthorizationToken, setToken } from '../../helpers'

const Login = ({ history }) => {
  const [email, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function signIn(e) {
    API('POST', 'user/login', { email, password })
      .then((res) => {
        setToken(res.data.token)
        setAuthorizationToken(res.data.token)
        history.push('/admin')
      })
      .catch((err) => {
        setError(err.response && err.response.data.message)
      })
  }

  return (
    <div className={styles.login}>
      <p className={styles.error}>{error && error}</p>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setLogin(event.target.value)}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Field>
        <Button onClick={signIn} type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  )
}

export default Login
