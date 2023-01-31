import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';
import FancyButton from './FancyButton';

// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
const HeroSection = () => {
  return (
    <div className="px-6 min-h-screen bg-purple-900">
      <div className="text-center">
        <h1 className="font-bold text-[#fff] text-4xl md:text-7xl max-w-4xl mx-auto pt-40 md:pb-12 pb-6">
          Decentralised Fund Manager
        </h1>

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
          className="text-[#fff] text-xl md:text-3xl"
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
      </div>
    </div>
  );
};
export default HeroSection;
