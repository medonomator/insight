import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import Home from '../../components/home'
import Aphorisms from '../aphorisms'
import Materials from '../materials'
import Settings from '../settings'
import Timeline from '../../components/timeline'
import CheckCursor from '../../components/CheckCursor'
import Notification from '../../components/common/Notification'

import SingleAphorism from '../../containers/SingleAphorism'

import { getToken, setToken, setAuthorizationToken } from '../../helpers'
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
      <aside className={styles.sidebar}>
        <div className={styles.menu}>
          <Link to="/admin">Главная</Link>
          <Link to="/admin/aphorisms">Афоризмы</Link>
          <Link to="/admin/materials">Материалы</Link>
          <Link to="/admin/timeline">Timeline</Link>
          <Link to="/admin/settings">Настройки</Link>
        </div>
      </aside>

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
          component={SingleAphorism}
        />
      </main>

      <Notification />
      <CheckCursor />
    </div>
  )
}

export default App
