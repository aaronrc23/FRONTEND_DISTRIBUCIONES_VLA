'use client';

import { motion } from 'framer-motion';

interface TapeRollProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'pink';
    animated?: boolean;
    className?: string;
}

const sizes = {
    sm: { outer: 'w-6 h-6', inner: 'w-2.5 h-2.5' },
    md: { outer: 'w-10 h-10', inner: 'w-4 h-4' },
    lg: { outer: 'w-14 h-14', inner: 'w-6 h-6' },
    xl: { outer: 'w-20 h-20', inner: 'w-8 h-8' },
};

const colors = {
    orange: { bg: 'bg-orange-500', glow: '#f97316' },
    blue: { bg: 'bg-blue-500', glow: '#3b82f6' },
    red: { bg: 'bg-red-500', glow: '#ef4444' },
    skye: { bg: 'bg-sky-400', glow: '#0ea5e9' },
    green: { bg: 'bg-green-500', glow: '#22c55e' },
    purple: { bg: 'bg-purple-500', glow: '#a855f7' },
    pink: { bg: 'bg-pink-500', glow: '#ec4899' },
};

export default function TapeRoll({
    size = 'md',
    color = 'orange',
    animated = false,
    className = '',
}: TapeRollProps) {
    const { outer, inner } = sizes[size];
    const { bg, glow } = colors[color];

    return (
        <motion.div
            className={`relative ${outer} ${bg} rounded-full flex items-center justify-center ${className}`}
            // Entra desde la izquierda como si rodara hacia el navbar
            initial={{ x: -40, opacity: 0, rotate: -180 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            whileHover={{
                scale: 1.08,
                y: -1,
                rotate: 25,
                boxShadow: `0 0 18px ${glow}`,
                transition: { type: 'spring', stiffness: 260, damping: 18 },
            }}
            whileTap={{ scale: 0.85, rotate: -15 }}
        >
            {/* Aro interior con spin propio al hacer hover */}
            <motion.div
                className={`${inner} rounded-full border-[2.5px] border-white/80`}
                animate={animated ? { rotate: [0, 360] } : {}}
                transition={animated
                    ? { duration: 4, ease: 'linear', repeat: Infinity, repeatType: 'loop', }
                    : {}
                }
            />

            {/* Reflejo fijo */}
            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px]" />

            {/* Ping sutil — solo cuando animated=true */}
            {animated && (
                <motion.div
                    className={`absolute inset-0 rounded-full ${bg} opacity-30`}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.15, 0.05, 0.15],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
        </motion.div>
    );
}
