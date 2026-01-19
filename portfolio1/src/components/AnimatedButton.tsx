import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './AnimatedButton.module.css';

interface AnimatedButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
    onClick?: () => void;
    className?: string;
}

export const AnimatedButton = ({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
}: AnimatedButtonProps) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    const buttonContent = (
        <motion.button
            className={buttonClass}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <span className={styles.buttonText}>{children}</span>
            <motion.div
                className={styles.buttonGlow}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );

    if (href) {
        return (
            <a href={href} className={styles.buttonLink}>
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
};
