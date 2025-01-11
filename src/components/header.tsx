'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "@/components/button";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import HeaderNavigation from "@/components/header-navigation";
import {FaUserGraduate} from "react-icons/fa";

function Header() {
    const pathname = usePathname();
    const {data: session} = useSession();
    return (
        <header className="flex items-center justify-between flex-wrap px-4 py-6 sm:px-6 lg:px-8  gap-y-4 relative">
            <Link href='/' className="flex items-center justify-center gap-2 text-[35px] sm:text-[70px] font-bold text-[#adbec1]">
                <Image
                    src="/logo.png"
                    alt="main logo"
                    className="rounded-xl w-16 md:w-20 lg:w-28"
                    width={100}
                    height={100}
                />
                WordWise
            </Link>
            {session && <HeaderNavigation />}
            <div className="flex gap-2">
                {!session && pathname !== "/auth/login" &&
                    <Link
                        href="/auth/login"
                        className="inline-flex px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        Увійти
                    </Link>}
                {!session && pathname !== "/auth/registration" &&
                    <Link
                        href="/auth/registration"
                        className="inline-flex px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        Зареєструватися
                    </Link>}
                {session &&
                    <Link
                        href="/profile"
                        className={clsx(
                            "absolute top-1 right-1/4 t-1 px-6 py-2",
                            { "font-bold cursor-not-allowed": pathname === "/profile"  }
                        )}>
                        <span className="sm:hidden text-[#6B7280]">
                            <FaUserGraduate />
                        </span>
                        <span className='hidden sm:inline-flex'>
                            {session.user.name}
                        </span>
                    </Link>}
                {session &&
                    <Button
                        text="Вийти"
                        variant="secondary"
                        className="absolute top-1 right-1 sm:static"
                        onClick={() => signOut({callbackUrl: '/auth/login'})}
                    />}
            </div>
        </header>
    );
}

export default Header;