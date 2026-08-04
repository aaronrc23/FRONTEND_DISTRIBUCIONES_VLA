interface TapeRollProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'skye';
    animated?: boolean;
    className?: string;
    dark?: boolean;
}

const sizes: Record<string, { outer: string; inner: string }> = {
    sm: { outer: 'w-6 h-6', inner: 'w-2.5 h-2.5' },
    md: { outer: 'w-10 h-10', inner: 'w-4 h-4' },
    lg: { outer: 'w-14 h-14', inner: 'w-6 h-6' },
    xl: { outer: 'w-20 h-20', inner: 'w-8 h-8' },
};

const colors: Record<string, { bg: string; glow: string }> = {
    orange: { bg: 'bg-shoprimary2', glow: '#ff595e' },
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
        <div
            className={`
                relative ${outer} ${bg} rounded-full flex items-center justify-center ${className}
                animate-[tape-roll-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]
                transition-all duration-200 ease-out cursor-pointer
                hover:scale-105 hover:-translate-y-0.5 hover:rotate-[25deg]
                active:scale-[0.85] active:-rotate-[15deg]
                group
            `}
            style={{
                boxShadow: '0 0 0px transparent',
                transitionProperty: 'transform, box-shadow',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 18px ${glow}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0px transparent';
            }}
        >
            {/* Aro interior */}
            <div
                className={`
                    ${inner} rounded-full border-[2.5px] border-white/80
                    ${animated ? 'animate-[spin-slow_4s_linear_infinite]' : ''}
                    transition-transform duration-300
                    group-hover:rotate-90
                `}
            />

            {/* Reflejo fijo */}
            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px]" />

            {/* Ping sutil */}
            {animated && (
                <div
                    className={`absolute inset-0 rounded-full ${bg} opacity-30 animate-[ping-soft_3s_ease-in-out_infinite]`}
                />
            )}
        </div>
    );
}
