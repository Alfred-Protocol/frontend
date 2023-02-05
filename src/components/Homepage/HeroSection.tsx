import { useCallback } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import FancyButton from '../Layout/FancyButton';
import PageTitle from '../Layout/PageTitle';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import animationJSON from 'src/assets/particles.json';

// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
const HeroSection = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
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
      <FancyButton className="mt-8">
        <Link href="/funds">
          Get Started
          <ArrowRightIcon
            height={24}
            width={24}
            strokeWidth={3}
            className="inline pb-1"
          />
        </Link>
      </FancyButton>
    </div>
  );
};
export default HeroSection;
