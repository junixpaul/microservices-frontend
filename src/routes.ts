import { IRouterConfig } from 'ice';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import NotFound from '@/components/NotFound';

const routes: IRouterConfig[] = [{
  path: '/about',
  component: About,
}, {
  path: '/login',
  component: Login,
}, {
  path: '/forgot_password',
  component: ForgotPassword,
}, {
  path: '/register',
  component: Register,
}, {
  path: '/',
  exact: true,
  component: Home,
}, {
  component: NotFound,
}];

export default routes;
