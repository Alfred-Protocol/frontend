import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useNetwork } from 'wagmi';

const Fund = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  return (
    <div className="bg-white py-4 px-4 flex-1 rounded shadow text-left">
      <h3 className="font-bold text-purple-900 text-xl">DAI / USDC</h3>
      <p>
        <span className="font-semibold">Total Liquidity: </span>
        <span>10 ETH</span>
      </p>
      <p>
        <span className="font-semibold">Manager: </span>
        <span>
          0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3
          <ArrowTopRightOnSquareIcon
            height={20}
            width={20}
            className="inline pb-1 ml-2 cursor-pointer stroke-2 hover:stroke-purple-500 transition-all"
            onClick={() =>
              router.push(
                'https://polygonscan.com/address/0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3'
              )
            }
          />
        </span>
      </p>
    </div>
  );
};

export default Fund;
