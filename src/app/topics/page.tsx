import React from 'react';

const folders = [
    { id: 1, name: "Подорожі", color: "#fca5a5" },
    { id: 2, name: "Їжа" },
];

function Page() {
    return (
        <ul>
            {folders.map(({id, name, color }) => (
                <li key={id} className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded font-black text-white text-xl"
                        style={{backgroundColor : color ? color : "#d4d4d8"}}
                    >
                        {name[0]}
                    </div>
                    {name}
                </li>
            ))}
        </ul>
    );
}

export default Page;