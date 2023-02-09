import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { TypeAnimation } from 'react-type-animation';
import animationJSON from 'src/assets/particles.json';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import CustomButton from '../Common/CustomButton';
import PageTitle from '../Layout/PageTitle';

import { useRouter } from 'next/router';

// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
const HeroSection = () => {
  const router = useRouter();
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );
  return (
    <div className="space-y-4">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        // @ts-expect-errorts-ignore ignore
        options={animationJSON}
      />
      <PageTitle title="Decentralised Fund Manager" />
      <TypeAnimation
        sequence={[
          'Earn with the best in crypto.', // Types 'One'
          2000, // Waits 1s
          'Investment made easy.', // Deletes 'One' and types 'Two'
          2000, // Waits 2s
          'Best in the market.', // Types 'Three' without deleting 'Two'
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '2em' }}
        className="text-xl text-white md:text-3xl"
      />
      <div className="flex justify-center pt-6">
        <CustomButton
          title="Get Started"
          theme="transparentPurple"
          className=""
          onClick={() => router.push('/home')}
        />
      </div>
    </div>
  );
};
export default HeroSection;
