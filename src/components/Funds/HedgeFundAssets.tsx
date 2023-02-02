//src/App.js
//Import libraries and components
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFTCard from '../NFTCard';
import CollectionSearch from '../CollectionSearch';

function App() {
  //State variables
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(
    '0xc36442b4a4522e871399cd717abdd847ab11fe88'
  );

  //function to fetch nfts by collection
  const fetchCollection = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://hardworking-late-firefly.quiknode.pro/65fc8167ff913b5f6e127f71b9f6deeddd651f71/'
    );
    let collection = await provider.send('qn_fetchNFTsByCollection', {
      collection: address,
      page: 1,
      perPage: 100,
    });

    const temp = [...collection.tokens];
    console.log('testing ', temp);
    const newCollection = temp.filter((token) => Boolean(token.imageUrl));
    // console.log('collection test', collection);
    collection.tokens = newCollection;
    return collection;
  };

  //useEffect renders every time address is set
  useEffect(() => {
    fetchCollection()
      .then((data) => {
        setNFTs(data.tokens);
        setIsLoading(false);
        console.log(data);
      })
      .catch((err) => setNFTs([]));
  }, [address]);

  //jsx containing our conditional rendering
  return (
    <div className="flex justify-center min-h-screen bg-purple-900">
      <div className="container mx-auto mt-10">
        {/* <CollectionSearch searchText={(text) => setAddress(text)} /> */}
        {!isLoading && nfts.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No Collection Found
          </h1>
        )}
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((token, idx) => (
            <NFTCard key={token.name} nft={token} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
