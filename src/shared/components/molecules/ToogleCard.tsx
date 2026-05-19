import React from 'react';
import { cn } from '../../../lib/utils';
import { Toggle } from '../../ui';


interface ToggleCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'onChange'> {
    title: React.ReactNode;
    description?: React.ReactNode;
    iconChecked?: React.ReactNode;
    iconUnchecked?: React.ReactNode;
    className?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;

}
export function ToggleCard({
    checked,
    onChange,
    title,
    description,
    iconChecked,
    iconUnchecked,
    className,
    ...props
}: ToggleCardProps) {
    const handleToggle = () => onChange(!checked);

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-4 transition-all duration-300",
                checked
                    ? "border-success-20/30 text-textsucces  bg-success-20/5 ring-1 ring-success-20/80  dark:ring-success-20/20"
                    : "border border-gray-300/80 dark:border bg-card  dark:bg-input/50 text-foreground ",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-4 text-left">
                <div className='flex gap-0.5 flex-col'>
                    <span className="block text-sm font-semibold ">{title}</span>
                    {description && <span className="block text-xs  font-light">{description}</span>}
                </div>
            </div>

            {/* Aquí usamos tu Toggle tal cual */}
            <Toggle checked={checked} onChange={onChange} size="md" />
        </button>
    );
}