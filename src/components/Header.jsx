"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession , signOut} from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden md:inline-flex">
          <Image
            src="/Instagram_logo_black.webp"
            width={96}
            height={96}
            alt="logo"
          />
        </Link>
        <Link href="/" className="md:hidden">
          <Image
            src="/800px-Instagram_logo_2016.webp"
            width={40}
            height={40}
            alt="logo"
          />
        </Link>
        {/* search inputs */}

        <input
          type="text"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* menu items */}

        {session ? (
          <img src={session.user.image} alt={session.user.name} className="h-10 w-10 rounded-full cursor-pointer" onClick={() => signOut()} />
        ) : (
          <button
            onClick={() => signIn()}
            className=" text-blue-500 font-semibold text-sm"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
