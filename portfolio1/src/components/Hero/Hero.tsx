import { motion } from 'framer-motion';
import { AnimatedButton } from '../AnimatedButton';
import { AnimatedBackground } from './AnimatedBackground';
import { portfolioData } from '../../data/portfolio';
import { staggerContainer, fadeInUp, fadeInDown } from '../../utils/animations';
import styles from './Hero.module.css';

export const Hero = () => {
    const { hero } = portfolioData;

    // Split name into letters for staggered animation
    const nameLetters = hero.name.split('');

    return (
        <section className={styles.hero} id="home">
            <AnimatedBackground />

            <motion.div
                className={styles.content}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Name */}
                <motion.h1 className={styles.name} variants={fadeInDown}>
                    {nameLetters.map((letter, index) => (
                        <motion.span
                            key={index}
                            className={styles.letter}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Tagline with gradient */}
                <motion.p className={styles.tagline} variants={fadeInUp}>
                    <span className="gradient-text">{hero.tagline}</span>
                </motion.p>

                {/* Description */}
                <motion.p className={styles.description} variants={fadeInUp}>
                    {hero.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className={styles.ctaButtons} variants={fadeInUp}>
                    {hero.ctaButtons.map((button, index) => (
                        <AnimatedButton
                            key={index}
                            variant={button.variant}
                            href={button.href}
                        >
                            {button.text}
                        </AnimatedButton>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    <motion.div
                        className={styles.scrollLine}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className={styles.scrollText}>Scroll to explore</span>
                </motion.div>
            </motion.div>
        </section>
    );
};
