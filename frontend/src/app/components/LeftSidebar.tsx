
"use client";

import React, { useMemo } from "react";
import { FaXTwitter, FaFeather } from "react-icons/fa6";
import { GoHome, GoSearch, GoPerson, GoBell } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import Link from "next/link";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/lib/graphql-client";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface SidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function LeftSidebar ({ user }: { user: any }) {
  const queryClient = useQueryClient();

  const sidebarMenuItems: SidebarButton[] = useMemo(
    () => [
      { title: "Home", icon: <GoHome />, link: "/" },
      { title: "Explore", icon: <GoSearch />, link: "/" },
      { title: "Notifications", icon: <GoBell />, link: "/" },
      { title: "Messages", icon: <CiMail />, link: "/" },
      { title: "Profile", icon: <GoPerson />, link: `/${user?.id}` },
    ],
    [user?.id]
  );

  const handleLoginWithGoogle = async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error(`Google token not found`);

    const data: any = await graphqlClient.request(verifyUserGoogleTokenQuery, {
      token: googleToken,
    });
    let verifyGoogleToken: any = data?.verifyGoogleToken;

    if (verifyGoogleToken)
      window.localStorage.setItem("token", verifyGoogleToken);

    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  };

  return (
    <div className="flex flex-col justify-between h-full py-2 pr-4">
      {/* Top Section: Logo, Menu, Post Button */}
      <div>
        <div className="text-3xl h-fit w-fit hover:bg-zinc-800 rounded-full p-3 cursor-pointer transition-all duration-200">
          <FaXTwitter />
        </div>
        <div className="mt-4 text-xl">
          <ul>
            {sidebarMenuItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.link}
                  className="flex justify-start items-center gap-4 hover:bg-zinc-800 rounded-full px-4 py-3 w-fit cursor-pointer transition-all duration-200 mt-2"
                >
                  <span className="text-3xl">{item.icon}</span>
                  {/* Text is larger and hidden on mobile */}
                  <span className="hidden sm:inline text-lg">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-3 px-4 rounded-full w-full hover:bg-opacity-90 transition-all duration-200">
              Post
            </button>
            <button className="block sm:hidden ml-2 bg-[#1d9bf0] font-semibold text-lg p-3 rounded-full">
              <FaFeather />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        {user ? (
          <div className="flex items-center w-full hover:bg-zinc-800 p-3 rounded-full cursor-pointer transition-all duration-200">
            {user.profileImageUrl && (
              <Image
                className="rounded-full"
                src={user.profileImageUrl}
                alt="user-image"
                height={40}
                width={40}
              />
            )}
            <div className="hidden sm:flex flex-1 items-center justify-between ml-3">
              <div className="flex-col">
                <h3 className="text-sm font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <span className="text-xs text-zinc-500">
                  @{user.email?.split("@")[0]}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pr-4">
            <div className="hidden sm:block">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                theme="outline" 
              />
            </div>
            <div className="block sm:hidden ml-2">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                type="icon"
                shape = "rectangular"
                theme="filled_black" 
                size="large"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;