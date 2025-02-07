'use client';

import React from 'react';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary'; // Додаткові варіанти стилів
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, variant = 'primary', disabled = false, className, ...rest}) => {
    return (
        <button
            {...rest}
            disabled={disabled}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
                    : 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300'
            } ${disabled && 'cursor-not-allowed'} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
