import type { ReactNode } from 'react';
import DefaultHead from './DefaultHead';
import Footer from './Footer';
import Header from './Header';

const Layout = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <DefaultHead />
      <main className="flex min-h-screen flex-col bg-transparent bg-black bg-hero">
        <Header />
        <div className={`flex-1 px-6 pb-20 ${className}`}>
          <div className="mx-auto text-center">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
