import type { ReactNode } from 'react';
import DefaultHead from './DefaultHead';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DefaultHead />
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="px-6 bg-purple-900 flex-1">
          <div className="text-center max-w-7xl mx-auto">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
