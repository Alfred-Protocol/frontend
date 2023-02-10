import Layout from '@/components/Layout/Layout';
import PageTitle from '@/components/Layout/PageTitle';
import { CalendarDaysIcon, SunIcon } from '@heroicons/react/24/outline';
import { Timeline } from 'flowbite-react';
import { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return;
  }

  return (
    <Layout>
      <PageTitle title="Roadmap" />
      <div className="mx-auto max-w-6xl rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 pb-6 text-left">
        <Timeline horizontal className="md:space-x-6 pt-8">
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Genesis - Onboarding competition</Timeline.Title>
              <Timeline.Time>Q2 2023</Timeline.Time>
              <Timeline.Body></Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Mainnet - Investor onboarding</Timeline.Title>
              <Timeline.Time>Q4 2023</Timeline.Time>
              <Timeline.Body></Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>
                Wormhole bridge - LP on additional chains
              </Timeline.Title>
              <Timeline.Time>Q2 2024</Timeline.Time>
              <Timeline.Body></Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>
                Voting on fee tier value and structure
              </Timeline.Title>
              <Timeline.Time>Q3 2024</Timeline.Time>
              <Timeline.Body></Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>
                Additional butler strategies - e.g., delta neutral IL
              </Timeline.Title>
              <Timeline.Time>Q3 2024</Timeline.Time>
              <Timeline.Body></Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </Layout>
  );
};
export default AboutPage;
