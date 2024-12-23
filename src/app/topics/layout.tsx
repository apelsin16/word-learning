import React from 'react';
import SessionProviderWrapper from "@/components/session-provider-wrapper";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <SessionProviderWrapper>
            {children}
        </SessionProviderWrapper>
    );
}

export default Layout;