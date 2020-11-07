import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../../components/home'
import Aphorisms from '../aphorisms'
import Materials from '../materials'
import Settings from '../settings'
import Timeline from '../../components/timeline'
import { getToken, setToken, setAuthorizationToken } from '../../helpers'
import { Dimmer, Loader } from 'semantic-ui-react'
import Notification from '../../components/common/Notification'
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
          <Link to="/admin/timeline">Timeline</Link>
          <Link to="/admin/settings">Настройки</Link>
        </div>
      </header>

      <div onClick={logout} className={styles.logout}>
        Logout
      </div>

      <main className={styles.wrapper}>
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/aphorisms" component={Aphorisms} />
        <Route exact path="/admin/materials" component={Materials} />
        <Route exact path="/admin/timeline" component={Timeline} />
        <Route exact path="/admin/settings" component={Settings} />
        <Route
          exact
          path={`${props.match.path}/aphorisms/:id`}
          component={() => <div>123</div>}
        />
      </main>

      <Notification />
    </div>
  )
}

export default App
