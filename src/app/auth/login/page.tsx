import React from 'react';
import Image from "next/image";
import LoginForm from "@/components/login-form";

function Page() {
    return (
        <div className="text-center">
            <Image
                src="/logo.png"
                alt="logo"
                width={200}
                height={200}
                className="rounded-3xl mx-auto mb-5"
            />
            <LoginForm />
        </div>
    );
}

export default Page;