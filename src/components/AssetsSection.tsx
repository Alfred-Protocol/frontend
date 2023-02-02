// TODO: add wavy background? https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
import { useState } from 'react';
import Card from './Card';
import PageTitle from './Layout/PageTitle';

const AssetsSection = () => {
  const [assets, setAssets] = useState([]);

  const fetchData = () => {};
  return (
    <>
      <PageTitle title="Assets" />
      <div className="flex flex-row flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};
export default AssetsSection;
