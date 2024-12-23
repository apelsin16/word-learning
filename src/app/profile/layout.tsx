'use client';

import React from 'react';
import {SessionProvider} from "next-auth/react";

interface ILayoutProps {
    children: React.ReactNode;
}

function Layout({children}: ILayoutProps) {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
}

export default Layout;