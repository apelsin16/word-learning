'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "@/components/button";
import {usePathname} from "next/navigation";

function Header() {
    const pathname = usePathname();
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
            <nav>
                <ul className="flex items-center justify-between gap-10">
                    <li>
                        <Link href="/" className={clsx("text-xl", {
                            'text-[#adbec1]': pathname !== '/'
                        })}>Home</Link>
                    </li>
                    <li>
                        <Link href="/topics" className={clsx("text-xl", {
                            'text-[#adbec1]': pathname !== '/topics'
                        })}>Topics</Link>
                    </li>
                    <li>
                        <Link href="/profile" className={clsx("text-xl", {
                            'text-[#adbec1]': pathname !== '/profile'
                        })}>Profile</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Button text="Log In" variant="primary"/>
                <Button text="Registration" variant="primary"/>
                <Button text="Log Out" variant="secondary"/>
            </div>
        </header>
    );
}

export default Header;