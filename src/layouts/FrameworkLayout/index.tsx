import { useEffect } from 'react';
import BasicLayout from '../BasicLayout';
import UserLayout from '../UserLayout';

export default function FrameworkLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: { path: string };
  appEnter: { path: string };
}) {
  const { pathname, children, appLeave, appEnter } = props;
  let Layout_ = BasicLayout;
  // eslint-disable-next-line no-empty
  if (pathname === '/login') {
    Layout_ = UserLayout;
  } else if (pathname === '/register') {
    Layout_ = UserLayout;
  } else if (pathname === '/forgot_password') {
    Layout_ = UserLayout;
  }
  const Layout = Layout_;
  useEffect(() => {
    console.log('== app leave ==', appLeave);
    console.log('== app leave ==', children);
    if (appLeave.path === '/angular' && window.webpackJsonp) {
      // remove webpackJsonp added by Angular app
      delete window.webpackJsonp;
    }
  }, [appLeave]);

  useEffect(() => {
    console.log('== app enter ==', appEnter);
    console.log('== app enter ==', children);

  }, [appEnter]);

  return (
    <Layout pathname={pathname}>{children}</Layout>
  );
}
