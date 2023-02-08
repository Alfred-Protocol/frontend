import truncateEthAddress from 'truncate-eth-address';

export default function truncateString(str: string, length: number = 10) {
  return truncateEthAddress(str);
}
