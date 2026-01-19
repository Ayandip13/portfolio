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
                    {/* Contact Form */}
                    <motion.form
                        className={`${styles.form} glass`}
                        onSubmit={handleSubmit}
                        variants={fadeInUp}
                    >
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className={focusedField === 'name' || formData.name ? styles.filled : ''}
                            />
                            <label htmlFor="name">Your Name</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className={focusedField === 'email' || formData.email ? styles.filled : ''}
                            />
                            <label htmlFor="email">Your Email</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <textarea
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className={focusedField === 'message' || formData.message ? styles.filled : ''}
                            />
                            <label htmlFor="message">Your Message</label>
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitBtn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>

                    {/* Social Links */}
                    <motion.div className={styles.social} variants={fadeInUp}>
                        <h3 className={styles.socialTitle}>Find me on</h3>
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
