"use client";

import React from 'react';
import {useSession} from "next-auth/react";

function Profile() {

    const {data: session} = useSession();

    return (
        <div>
            <div className="my-2">
                <span className="font-bold">Name:</span> {session?.user.name}
            </div>
            <div className="my-2">
                <span className="font-bold">E-mail:</span> {session?.user.email}
            </div>
        </div>
    );
}

export default Profile;