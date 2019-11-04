import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import TopPanel from '../src/components/TopPanel';
import api from './helpers/api';
// Pages
import MainPage from './Pages/MainPage';
import AphorismsPage from './Pages/AphorismsPage';
import AffirmationPage from './Pages/AffirmationPage';

function App({ history }) {
  React.useEffect(() => {
    const fetchAuth = async () => {
      const data = await api('user/auth', 'GET');
      if (data.status !== 200) history.push('login');
    };
    fetchAuth();
  }, []);

  return (
    <div className="root">
      <TopPanel />
      <Route exact path="/admin" component={MainPage} />
      <Route path="/admin/aphorisms" component={AphorismsPage} />
      <Route path="/admin/affirmation" component={AffirmationPage} />
    </div>
  );
}
ProcessEnv
export default withRouter(App);
