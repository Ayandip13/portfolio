import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './AnimatedBackground.module.css';

export const AnimatedBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={styles.background}>
            {/* Gradient Orbs */}
            <motion.div
                className={`${styles.orb} ${styles.orb1}`}
                animate={{
                    x: mousePosition.x * 30,
                    y: mousePosition.y * 30,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
            <motion.div
                className={`${styles.orb} ${styles.orb2}`}
                animate={{
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
            <motion.div
                className={`${styles.orb} ${styles.orb3}`}
                animate={{
                    x: mousePosition.x * 25,
                    y: mousePosition.y * -25,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />

            {/* Grid Lines */}
            <div className={styles.grid} />
        </div>
    );
};
