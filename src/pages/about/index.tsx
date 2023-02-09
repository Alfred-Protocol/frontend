import Layout from '@/components/Layout/Layout';
import { useAppContext } from '@/context/app/appContext';
import Radium from 'radium';
import { useEffect, useState } from 'react';
import { bounce, fadeIn } from 'react-animations';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return;
  }

  return (
    <Radium.StyleRoot>
      <Layout>
        <div className="flex w-full justify-center">
          <div className="mt-10 flex w-4/5 flex-col space-y-10"></div>
        </div>
      </Layout>
    </Radium.StyleRoot>
  );
};
export default AboutPage;
