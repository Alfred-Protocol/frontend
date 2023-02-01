import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FetchSignerResult } from '@wagmi/core';
import { Signer } from 'ethers';
import Link from 'next/link';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

interface Props {
  isWalletConnected: Boolean;
}

export default function Header({ isWalletConnected }: Props) {
  const router = useRouter();

  const navigateToAsset = () => {
    router.push('assets');
  };
  return (
    <Popover className="relative bg-purple-900" as={'header'}>
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between border-b-2 border-purple-900 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Fund Asset Manager</span>
              <p className="text-purple-100">Fund Asset Manager</p>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                className="h-6 w-6 stroke-2 stroke-purple-200"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Link
              href="/leaderboard"
              className="font-semibold text-lg text-purple-100 hover:text-purple-200 transition-all"
            >
              Leaderboard
            </Link>
            <Link
              href="/funds"
              className="font-semibold text-lg text-purple-100 hover:text-purple-200 transition-all"
            >
              Funds
            </Link>
            {isWalletConnected && (
              <div onClick={navigateToAsset}>
                <TypeAnimation
                  sequence={['Your Assets', 3000]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  className="font-semibold text-lg text-purple-100 hover:text-purple-200 transition-all"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <ConnectButton />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p>Logo</p>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8"></nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
