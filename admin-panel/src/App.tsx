import React from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import TopPanel from '../src/components/TopPanel';
import api from './helpers/api';
// Pages
import MainPage from './containers/MainPage';
import AphorismsPage from './containers/AphorismsPage';
import AffirmationPage from './containers/AffirmationPage';

class App extends React.Component<RouteComponentProps, any> {
  state = {
    isAuth: false,
  };

  componentWillMount() {
    api('user/auth', 'GET')
      .then(res => {
        if (res.status === 200) {
          this.setState({ isAuth: true });
        }
      })
      .catch(() => {
        this.props.history.replace({ pathname: '/admin/login' });
      });
  }

  render() {
    return this.state.isAuth ? (
      <div className="root">
        <TopPanel />
        <Route exact path="/admin" component={MainPage} />
        <Route path="/admin/aphorisms" component={AphorismsPage} />
        <Route path="/admin/affirmation" component={AffirmationPage} />
      </div>
    ) : (
      <div className="loader">Preloader</div>
    );
  }
}

export default withRouter(App);
