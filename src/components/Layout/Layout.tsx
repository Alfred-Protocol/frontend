import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-6 min-h-screen bg-purple-900">
      <div className="text-center max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
