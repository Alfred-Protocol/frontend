import React from 'react';
import { Link } from 'react-router-dom';

const CustomToastWithLink = ({
  txId,
  content,
}: {
  txId: string;
  content: string;
}) => {
  const polygonScan = `https://mumbai.polygonscan.com/tx/${txId}`;
  return (
    <div>
      {content}{' '}
      <a
        style={{ textDecoration: 'underline', color: '#0784C3' }}
        target="_blank"
        href={polygonScan}
      >
        {txId}
      </a>
    </div>
  );
};

export default CustomToastWithLink;
