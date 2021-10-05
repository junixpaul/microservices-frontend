import { Shell } from '@alifd/next';
import PageNav from './components/PageNav';
import Footer from './components/Footer';
import { useEffect } from 'react';

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

export default function BasicLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: string;
  appEnter: string;
}) {
  const { children, pathname, appLeave, appEnter } = props;

  useEffect(() => {
    console.log(`The micro-application routing has changed: ${ pathname } `);
  }, [pathname]);

  useEffect(() => {
    console.log(` Uninstall micro application: ${ appLeave } `);
  }, [appLeave]);

  useEffect(() => {
    console.log(` Rendering micro application: ${ appEnter } `);
  }, [appEnter]);

  return (
    <Shell
      type="brand"
      style={{
        minHeight: '100vh',
      }}
    >
      <Shell.Branding>
        Framework
      </Shell.Branding>

      <Shell.Navigation>
        <PageNav pathname={pathname} />
      </Shell.Navigation>

      <Shell.Content>{children}</Shell.Content>
      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}
