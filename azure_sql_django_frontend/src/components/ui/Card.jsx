import React from 'react';
import { cn } from '../Layout';

export const Card = ({ children, className }) => (
    <div className={cn("bg-surface/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden text-card-foreground shadow-sm", className)}>
        {children}
    </div>
);

export const CardHeader = ({ children, className }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6 border-b border-slate-800/50", className)}>
        {children}
    </div>
);

export const CardTitle = ({ children, className }) => (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight text-white", className)}>
        {children}
    </h3>
);

export const CardContent = ({ children, className }) => (
    <div className={cn("p-6", className)}>
        {children}
    </div>
);
