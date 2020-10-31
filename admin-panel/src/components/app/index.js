import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Aphorisms from '../aphorisms'
import Materials from '../materials'
import Settings from '../settings'
import { getToken, setToken, setAuthorizationToken } from '../../helpers'
import { Dimmer, Loader } from 'semantic-ui-react'
import { API } from '../../helpers/axios'
import styles from './app.module.sass'

const App = (props) => {
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setAuthorizationToken(getToken())
      API('GET', 'user/auth')
        .then((res) => {
          setAuth(true)
        })
        .catch((err) => {
          props.history.push('/admin/login')
        })
    } else {
      props.history.push('/admin/login')
    }
  }, [])

  const logout = () => {
    setAuthorizationToken('')
    setToken('')
    setAuth(false)
    props.history.push('/admin/login')
  }

  if (!isAuth)
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    )

  return (
    <div className={styles.main}>
      <header className={styles.sidebar}>
        <div className={styles.menu}>
          <Link to="/admin">Главная</Link>
          <Link to="/admin/aphorisms">Афоризмы</Link>
          <Link to="/admin/materials">Материалы</Link>
          <Link to="/admin/settings">Настройки</Link>
        </div>
      </header>

      <div onClick={logout} className={styles.logout}>
        Logout
      </div>

      <main>
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/aphorisms" component={Aphorisms} />
        <Route exact path="/admin/materials" component={Materials} />
        <Route exact path="/admin/settings" component={Settings} />
      </main>
    </div>
  )
}

export default App
