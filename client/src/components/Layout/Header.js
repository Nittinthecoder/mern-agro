/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";


import "rsuite/dist/rsuite-no-reset.min.css";

import { Dropdown, Avatar } from "rsuite";
import { Badge } from "antd";

import { Link } from "react-router-dom";
import { Toaster ,toast } from "sonner";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";

const navigation = [{ name: "Products", link: "/", user: true }];

// eslint-disable-next-line
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const renderToggle = (props) => (
  <Avatar
    circle
    {...props}
    src="https://i.pravatar.cc/150?u=git@rsutiejs.com"
  />
);

function Header({ children }) {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // const toaster = useToaster();

  const [open, setOpen] = useState(false);
  return (
    <div className="bg-background">
      <Toaster />
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-text"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div>
                  {navigation.map((item) => (
                    <Link>{item.name}</Link>
                  ))}
                </div>

                <div className="space-y-6 border-t border-primary px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/login"
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </div>

                <div className="border-t border-primary px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-background">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex h-16 items-center">
              {/* menu button in mobile devices */}
              <button
                type="button"
                className="relative rounded-md bg-background p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <img
                  className="h-8 w-auto"
                  src="https://i.pinimg.com/originals/30/34/5a/30345a99c8bc23f42d6b9848227b1f0d.jpg"
                  alt=""
                />
              </div>

              {/* menus */}

              <div className="">
                {navigation.map((item) => (
                  <Link to={item.link} className="ml-4">
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="ml-auto flex items-center">
                {!auth?.user && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-text hover:text-gray-500"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      href="#"
                      className="text-sm font-medium text-text hover:text-gray-500"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                {auth?.user && (
                  <Dropdown placement="bottomEnd" renderToggle={renderToggle}>
                    <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                      <p>Signed in as</p>
                      <strong>{auth?.user?.name}</strong>
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <div className="flex flex-col px-2 py-3">
                      {auth?.user?.role === 0 && (
                        <Link to="/userdashboard/profile" className="mb-2">
                          {" "}
                          Your profile
                        </Link>
                      )}
                      {auth?.user?.role === 1 && (
                        <Link to="/admindashboard" className="mb-2">
                          {" "}
                          Your profile
                        </Link>
                      )}
                      <Link to="" className="" onClick={handleLogout}>
                        Sign out
                      </Link>
                    </div>
                  </Dropdown>
                )}

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <Link to="/cart">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-secondary group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </Link>
                    <span className="ml-2 text-sm font-medium text-primary group-hover:text-secondary">
                      <Badge
                        color="green"
                        count={cart?.length}
                        showZero
                      ></Badge>
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Header;
