import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { logout } from "@/State/Auth/Action";
import {
  ActivityLogIcon,
  BookmarkIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const menu = [
//   { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
//   {
//     name: "Portfolio",
//     path: "/portfolio",
//     icon: <DashboardIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Watchlist",
//     path: "/watchlist",
//     icon: <BookmarkIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Activity",
//     path: "/activity",
//     icon: <ActivityLogIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Wallet",
//     path: "/wallet",
//     icon: <WalletIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Payment Details",
//     path: "/payment-details",
//     icon: <LandmarkIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Withdrawal",
//     path: "/withdrawal",
//     icon: <CreditCardIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Profile",
//     path: "/profile",
//     icon: <PersonIcon className="h-6 w-6" />,
//   },
//   {
//     name: "Logout",
//     path: "/logout",
//     icon: <ExitIcon className="h-6 w-6" />,
//   },
// ];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const menu = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    {
      name: "Portfolio",
      path: "/portfolio",
      icon: <DashboardIcon className="h-6 w-6" />,
    },
    {
      name: "Watchlist",
      path: "/watchlist",
      icon: <BookmarkIcon className="h-6 w-6" />,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: <ActivityLogIcon className="h-6 w-6" />,
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: <WalletIcon className="h-6 w-6" />,
    },
    {
      name: "Payment Details",
      path: "/payment-details",
      icon: <LandmarkIcon className="h-6 w-6" />,
    },
    {
      name: "Withdrawal",
      path: "/withdrawal",
      icon: <CreditCardIcon className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <PersonIcon className="h-6 w-6" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <ExitIcon className="h-6 w-6" />,
    },
  ];
  if (auth.user?.role === "ROLE_ADMIN") {
    // The unshift() method adds the new item to the beginning of the array
    menu.unshift({
      name: "Admin Panel",
      path: "/admin",
      icon: <LockClosedIcon className="h-6 w-6" />,
    });
  }
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(120vh-100px)] pr-1 custom-scrollbar">
      {menu.map((item) => (
        <div key={item.name}>
          <SheetClose asChild className="w-full">
            <Button
              variant="outline"
              className="flex items-center gap-5 py-6 w-full  bg-white/5 hover:bg-white/30 backdrop-blur-sm 
            transition-all duration-100 border border-white/10"
              onClick={() => {
                navigate(item.path);
                if (item.name == "Logout") handleLogout();
              }}
            >
              <span className="w-8 scale-130">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
