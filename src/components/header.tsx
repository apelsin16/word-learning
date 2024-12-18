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

function Header() {
    const pathname = usePathname();
    const {data: session} = useSession();
    return (
        <header className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-[70px] font-bold text-[#adbec1]">
                <Image
                    src="/logo.png"
                    alt="main logo"
                    width={75}
                    height={75}
                    className="rounded-xl"
                />
                WordWise
            </div>
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
                            "inline-flex px-6 py-2",
                            { "font-bold cursor-not-allowed": pathname === "/profile"  }
                        )}>
                        {session.user.name}
                    </Link>}
                {session &&
                    <Button
                        text="Вийти"
                        variant="secondary"
                        onClick={() => signOut({callbackUrl: '/auth/login'})}
                    />}
            </div>
        </header>
    );
}

export default Header;