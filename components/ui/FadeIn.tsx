import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    fullWidth?: boolean;
    triggerOnce?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    className = '',
    fullWidth = false,
    triggerOnce = false
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: triggerOnce, margin: "-10% 0px -10% 0px" });

    const getInitial = () => {
        switch (direction) {
            case 'up': return { opacity: 0, y: 40 };
            case 'down': return { opacity: 0, y: -40 };
            case 'left': return { opacity: 0, x: 40 };
            case 'right': return { opacity: 0, x: -40 };
            case 'none': return { opacity: 0 };
            default: return { opacity: 0, y: 40 };
        }
    };

    const getAnimate = () => {
        switch (direction) {
            case 'up': return { opacity: 1, y: 0 };
            case 'down': return { opacity: 1, y: 0 };
            case 'left': return { opacity: 1, x: 0 };
            case 'right': return { opacity: 1, x: 0 };
            case 'none': return { opacity: 1 };
            default: return { opacity: 1, y: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={getInitial()}
            animate={isInView ? getAnimate() : getInitial()}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75]
            }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
