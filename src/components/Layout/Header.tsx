import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Logo from './Logo';

const links = [
  { name: 'Home', href: '/home' },
  { name: 'Manage Funds', href: '/funds' },
  { name: 'My Assets', href: '/assets' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const router = useRouter();
  return (
    <Popover className="relative bg-transparent" as={'header'}>
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between py-6 lg:justify-start lg:space-x-10">
          <Logo />
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-all hover:bg-purple-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                className="h-6 w-6 stroke-purple-200 stroke-2"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden space-x-6 lg:flex xl:space-x-10"
          >
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text-md font-semibold text-purple-100 transition-all hover:text-purple-200 hover:underline xl:text-lg"
                style={{
                  textDecoration:
                    router.asPath.split('/')[1] === href.replace('/', '')
                      ? 'underline'
                      : undefined,
                  textUnderlineOffset: 3,
                }}
              >
                {name}
              </Link>
            ))}
          </Popover.Group>
          <div className="!ml-5 hidden items-center justify-end text-sm lg:flex lg:flex-1">
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
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden z-50"
        >
          <div className="divide-y-2 divide-gray-800 rounded-lg bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-4 px-5">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded p-2 text-fuchsia-100 transition-colors hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                    className="text-base font-medium text-fuchsia-50 transition-all hover:text-purple-300"
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
