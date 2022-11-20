import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import SignInSide from './views/SignInSide';
import LayoutDefault from './layouts/LayoutDefault';
import SignUp from './views/SignUp';
import Home from './views/Home';
import DashboardContent from './adminViews/DashboardContent';
import Recommendations from './userViews/Recommendations';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/singin" component={SignInSide} />
          <AppRoute exact path="/singup" component={SignUp} />
          <AppRoute exact path="/dashboard" component={DashboardContent} />
          <AppRoute exact pat="/recommendations" component={Recommendations}  layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;