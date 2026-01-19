import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Track mouse movement
        window.addEventListener('mousemove', moveCursor);

        // Add hover detection for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, .cursor-hover'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className={styles.cursor}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            >
                <motion.div
                    className={styles.cursorInner}
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        backgroundColor: isHovering
                            ? 'rgba(0, 217, 255, 0.3)'
                            : 'rgba(0, 217, 255, 0.1)',
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
            <motion.div
                className={styles.cursorDot}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            />
        </>
    );
};
