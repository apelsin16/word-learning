import React from 'react';
import Link from "next/link";
import clsx from "clsx";
import {usePathname} from "next/navigation";

const links = [
    { href: '/', label: 'Home' },
    { href: '/topics', label: 'Topics' },
    { href: '/words', label: 'Words' },
];

function HeaderNavigation() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex items-center justify-between gap-10">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href}
                              className={clsx(
                                  "text-xl",
                                  {'text-[#adbec1]': pathname !== link.href}
                        )}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default HeaderNavigation;