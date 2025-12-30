import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
    children: React.ReactNode;
    bgImage?: string;
    speed?: number; // 0 to 1
    className?: string;
    overlayOpacity?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    bgImage,
    speed = 0.5,
    className = "",
    overlayOpacity = 0.5
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {bgImage && (
                <motion.div
                    className="absolute inset-0 w-full h-[120%] -top-[10%]"
                    style={{ y, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
                </motion.div>
            )}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
