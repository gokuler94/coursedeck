import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const navLinkClass =
  "px-4 py-2 rounded-md transition-colors duration-150 text-gray-700 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400";

const AppNavMenu: React.FC = () => (
  <div className="w-full flex items-center justify-between py-4 px-4">
    <Link to="/" className="flex items-center space-x-2 group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-neutral-900 group-hover:text-blue-600 transition-colors"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span className="font-bold text-lg text-neutral-900 group-hover:text-blue-600 transition-colors">
        CourseDeck
      </span>
    </Link>
    <NavigationMenu className="flex-1 justify-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/create-roadmap" className={navLinkClass}>
              Create Roadmap
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className="ml-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  </div>
);

export default AppNavMenu;
