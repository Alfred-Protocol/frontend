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
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className={`px-6 pb-20 bg-purple-900 flex-1 ${className}`}>
          <div className="text-center max-w-7xl mx-auto">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
