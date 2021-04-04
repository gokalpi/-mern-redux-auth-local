import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionTimeout from './components/SessionTimeout';

const LoginPage = lazy(() => import('./features/auth/Login'));
const ProfilePage = lazy(() => import('./features/auth/Profile'));
const RegisterPage = lazy(() => import('./features/auth/Register'));
const HomePage = lazy(() => import('./features/HomePage/HomePage'));
const SecurePage = lazy(() => import('./features/securePage'));
const UsersPage = lazy(() => import('./features/user/Users'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Layout = lazy(() => import('./layouts/Layout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout/AuthLayout'));
const BasicLayout = lazy(() => import('./layouts/BasicLayout/BasicLayout'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<span>Loading...</span>}>
        <Router>
          <Switch>
            <Route path={['/login', '/register']} exact>
              <Layout layout={AuthLayout} isPublic={true}>
                <Route path={'/login'} exact component={() => <LoginPage />} />
                <Route path={'/register'} exact component={() => <RegisterPage />} />
              </Layout>
            </Route>
            <Route path={['/', '/profile', '/secure', '/users']} exact>
              <Layout layout={BasicLayout} isPublic={true}>
                <Route path={'/'} exact component={() => <HomePage />} />
                <PrivateRoute path={'/profile'} exact component={() => <ProfilePage />} />
                <PrivateRoute path={'/secure'} exact component={() => <SecurePage />} />
                <PrivateRoute path={'/users'} exact component={() => <UsersPage />} />
              </Layout>
            </Route>
            <Route component={() => <div>404</div>}></Route>
          </Switch>
          <SessionTimeout />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
