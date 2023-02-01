import React from 'react';

//component that takes an nft object and maps it to corresponding elements
const NFTCard = ({ nft }: any) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg items-center">
      <img src={nft.imageUrl} alt="" className="w-100 mx-auto" />
      <div className="bg-button rounded-lg px-6 py-2 md:px-8 md:py-3 shadow-xl font-bold md:text-xl text-md hover:opacity-80 transition-all text-purple-900 bg-white mt-10 rounded-md">
        <div className="font-bold text-teal-600 text-xl mb-2">{nft.name}</div>
        <ul>
          <li>
            Owner:<strong>{nft.currentOwner}</strong>
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {nft.traits?.map((trait: any, index: any) => (
          <span
            key={index}
            className="inline-block
                 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2"
          >
            {trait['trait_type']}:{trait.value}
          </span>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default NFTCard;
