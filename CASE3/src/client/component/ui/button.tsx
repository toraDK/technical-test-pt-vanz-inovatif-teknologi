import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'action' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'action',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
        const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
        
        const variants = {
            primary: 'bg-brand-primary text-white hover:bg-[#125462]',
            secondary: 'bg-brand-secondary text-white hover:bg-[#3b879a]',
            action: 'bg-brand-action text-brand-primary hover:bg-[#e59524] shadow-sm hover:shadow',
            outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
        };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};