import React from "react";
import { Menu, X } from "lucide-react";
import { Transition } from "@headlessui/react";
import { menuItems, siteDetails } from "@/data";
import { Container } from "../ui";
import { ModeToggle } from "../mode-toggle";
import rutaPng from "@/assets/icons/ruta.png";


export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 md:absolute z-[1001] mx-auto w-full bg-white/90 dark:bg-slate-800/90">
            <Container className="pb-1 shadow-md md:shadow-none md:bg-transparent mx-auto flex justify-between items-center">

                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <img
                        src={rutaPng}
                        alt="Logo"
                        className="size-13 min-w-fit p-2"
                    />

                    <span className="manrope text-3xl font-semibold text-foreground cursor-pointer">
                        {siteDetails.siteName}
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <ul className="flex space-x-2">
                        {menuItems.map(item => (
                            <li key={item.text} className="text-sm">
                                <a
                                    href={item.url}
                                    className="text-foreground hover:text-primary transition-colors lg:text-xl font-roboto tracking-tighter border-b-2 border-transparent hover:border-primary pb-1"
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <ModeToggle />
                </div>


                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        )}
                    </button>
                </div>

            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden shadow-lg">
                    <ul className="flex flex-col space-y-4 p-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <a href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                    {item.text}
                                </a>
                            </li>
                        ))}
                        {/* Theme Toggle - Mobile */}
                        <li className="pt-2 border-t border-neutral-200">
                            <div className="flex items-center justify-between">
                                <span className="text-foreground text-sm">Tema</span>
                                <ModeToggle />
                            </div>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};