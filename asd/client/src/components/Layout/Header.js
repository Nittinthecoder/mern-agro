import { Dialog, Transition } from "@headlessui/react";
// import Dropdown from "react-bootstrap/Dropdown";
import { Fragment, useState } from "react";

import { Dropdown, Avatar } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const navigation = [{ name: "Products", link: "/", user: true }];

const renderToggle = (props) => (
  <Avatar
    circle
    {...props}
    src="https://i.pravatar.cc/150?u=git@rsutiejs.com"
  />
);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header({ children }) {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };

  return (
    <div className="bg-background">
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

                {/* Navi */}

                <div className="space-y-6 border-t border-primary px-4 py-6">
                  <div className="flex flex-col ml-[-1.4rem]">
                    {navigation.map((item) => (
                      <Link
                        to={item.link}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? " text-white"
                            : "text-text  hover:text-text",
                          "rounded-xl px-3 py-2 ml-3 mr-[-1rem] text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Links */}

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
                  <Link href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="">
        <nav aria-label="Top" className=" max-w-8xl px-3 sm:px-6 lg:px-8">
          <div>
            <div className="flex h-16 items-center justify-between">
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

              <div className=" lg:flex lg:flex-row hidden">
                {navigation.map((item) => (
                  <Link
                    to={item.link}
                    key={item.name}
                    className={classNames(
                      item.current
                        ? "bg-secondary text-white"
                        : "text-text hover:bg-secondary hover:text-text",
                      "rounded-xl px-3 py-2 ml-3 mr-[-1rem] text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="ml-auto  lg:flex lg:flex-row  items-center">
                {!auth?.user && <div className="mr-5">
                  <Link to="/register">Sign in</Link>
                </div>}

                {/* user menu */}
                
                {auth?.user && <Dropdown placement="leftStart" renderToggle={renderToggle}>
                  <Dropdown.Item panel style={{ padding: 10, width: 200 }}>
                    <p>Signed in as</p>
                    <strong>{auth?.user?.name}</strong>
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  <div className="flex flex-col no-underline p-3 hover:text-text">
                    {auth?.user?.role === 0 && (
                      <Link
                        to="/userdashboard"
                        className="mb-2 hover:text-text hover:no-underline text-black"
                      >
                        Your profile
                      </Link>
                    )}
                    {auth?.user?.role === 1 && (
                      <Link
                        to="/admindashboard"
                        className="mb-2 hover:text-text hover:no-underline text-black"
                      >
                        Admin profile
                      </Link>
                    )}
                    <Link className="mb-2 hover:text-text hover:no-underline text-black">
                      Your orders
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className=" hover:text-text hover:no-underline text-black"
                    >
                      Logout
                    </Link>
                  </div>
                </Dropdown>}
              </div>

              {/* //cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="#" className="group -m-2 flex items-center p-2">
                  <Link to="/Cart">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-primary "
                      aria-hidden="true"
                    />
                  </Link>
                  <span className="inline-flex items-center rounded-3xl mb-7 -ml-3 bg-black px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                    1
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
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
