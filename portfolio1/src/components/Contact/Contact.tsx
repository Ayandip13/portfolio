import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (placeholder)
        console.log('Form submitted:', formData);
        alert('Thank you for your message! (This is a demo)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className={styles.contact} id="contact" ref={ref}>
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

                <div className={styles.content}>
                    {/* Social Links */}
                    <motion.div className={styles.social} variants={fadeInUp}>
                        <h3 className={styles.socialTitle}>Find me on</h3>
                        <div
                            className={styles.socialGrid}
                            style={{
                                display: 'flex',
                            }}
                        >
                            {social.map((link, index) => {
                                const Icon = iconMap[link.icon];
                                return (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {Icon && <Icon />}
                                        <span>{link.name}</span>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
