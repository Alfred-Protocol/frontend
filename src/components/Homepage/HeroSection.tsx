import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';
import FancyButton from '../Layout/FancyButton';
import PageTitle from '../Layout/PageTitle';

// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
const HeroSection = () => {
  return (
    <>
      <PageTitle title="Decentralised Fund Manager" className="pt-40" />

      <TypeAnimation
        sequence={[
          'Earn with the best in crypto.', // Types 'One'
          2000, // Waits 1s
          'Investment made easy.', // Deletes 'One' and types 'Two'
          2000, // Waits 2s
          'Best in the market.', // Types 'Three' without deleting 'Two'
          () => {
            console.log('Done typing!'); // Place optional callbacks anywhere in the array
          },
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '2em' }}
        className="text-white text-xl md:text-3xl"
      />
      <FancyButton className="mt-8">
        <span>
          Get Started
          <ArrowRightIcon
            height={24}
            width={24}
            strokeWidth={3}
            className="inline pb-[4px]"
          />
        </span>
      </FancyButton>
    </>
  );
};
export default HeroSection;
