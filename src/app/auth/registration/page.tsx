import React from 'react';
import Image from "next/image";
import RegistrationForm from "@/components/registration-form";

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
            <RegistrationForm />
        </div>
    );
}

export default Page;