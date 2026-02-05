import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../Layout';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white shadow-lg shadow-primary/25",
        secondary: "bg-surface hover:bg-slate-700 text-white border border-slate-700",
        danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-700 text-white shadow-lg shadow-red-500/25",
        ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
