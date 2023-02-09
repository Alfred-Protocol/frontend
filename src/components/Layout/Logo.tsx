import Link from 'next/link';
import { AlfredLogo } from '../Common/Common';

const Logo = () => {
  return (
    <div className="flex justify-start space-x-2 lg:flex">
      <AlfredLogo width={20} />
      <Link href="/">
        <span className="sr-only">Alfred Protocol</span>
        <p className="font-bold sm:text-fuchsia-50 text-purple-200">Alfred Protocol</p>
      </Link>
    </div>
  );
};

export default Logo;
