import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Fragment } from 'react';

const links = [
  { name: 'Funds', href: '/funds' },
  { name: 'Your Assets', href: '/assets' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export default function Header() {
  return (
    <Popover className="relative bg-purple-900" as={'header'}>
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between border-b-2 border-purple-900 py-6 lg:justify-start lg:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Fund Asset Manager</span>
              <p className="text-purple-200 font-bold">Alfred Protocol</p>
            </Link>
          </div>
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-purple-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all">
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                className="h-6 w-6 stroke-2 stroke-purple-200"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 lg:flex px-6">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="font-semibold text-lg text-purple-100 hover:text-purple-200 transition-all"
              >
                {name}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden items-center justify-end lg:flex lg:flex-1 lg:w-0">
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
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden"
        >
          <div className="divide-y-2 divide-purple-900 rounded-lg bg-purple-700 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Logo</p>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-purple-700 p-2 text-purple-300  hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid gap-y-4">
                {links.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="text-base font-medium text-purple-100 hover:text-purple-300 transition-all"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <ConnectButton />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
