import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDribbble } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './Contact.module.css';

const iconMap: Record<string, any> = {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
    FaDribbble,
};

export const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { social } = portfolioData;

    return (
        <section className={styles.contact} id="contact" ref={ref}>
            {/* Decorative Background Orbs */}
            <div className={styles.backgroundOrb1}></div>
            <div className={styles.backgroundOrb2}></div>

            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.h2 className={styles.title} variants={fadeInUp}>
                    Let's <span className="gradient-text">Connect</span>
                </motion.h2>

                <motion.p className={styles.subtitle} variants={fadeInUp}>
                    Have a project in mind? Let's create something amazing together.
                </motion.p>

                {/* Social Links */}
                <motion.div className={styles.social} variants={fadeInUp}>
                    <h3 className={styles.socialTitle}>Connect With Me</h3>
                    <p className={styles.socialSubtitle}>Let's stay connected on social media</p>
                    <div className={styles.socialGrid}>
                        {social.map((link, index) => {
                            const Icon = iconMap[link.icon];
                            return (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className={styles.iconWrapper}>
                                        {Icon && <Icon />}
                                    </div>
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkName}>{link.name}</span>
                                        <span className={styles.linkHint}>{link.label}</span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
