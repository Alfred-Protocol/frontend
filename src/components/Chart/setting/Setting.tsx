import React from 'react';
import styled from 'styled-components';
import { Br } from 'src/components/Chart/atomic';
// import { ScreenWidth } from '../../utils/styled';
import DepositAmount from './DepositAmount';
import PriceRange from './PriceRange';

export const ScreenWidth = {
  MOBILE: 576,
  TABLET: 930,
};

const SettingContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;

  @media only screen and (max-width: ${ScreenWidth.MOBILE}px) {
    padding: 12px;
    border-radius: 12px;
  }
`;

interface Props {
  isLoading: boolean;
}

const Setting = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <div role="status" className="h-72 w-full animate-pulse">
        <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center space-x-5 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-4 px-8 text-left text-white">
      <DepositAmount />
      <Br />
      <PriceRange />
    </div>
  );
};

export default Setting;
