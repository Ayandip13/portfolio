import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './Experience.module.css';

export const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { experience } = portfolioData;

    return (
        <section className={styles.experience} id="experience" ref={ref}>
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.h2 className={styles.title} variants={fadeInUp}>
                    My <span className="gradient-text-accent">Journey</span>
                </motion.h2>

                <div className={styles.timeline}>
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                            }
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <div className={styles.timelineDot} />
                            <div className={`${styles.card} glass`}>
                                <span className={styles.period}>{item.period}</span>
                                <h3 className={styles.role}>{item.role}</h3>
                                <h4 className={styles.company}>{item.company}</h4>
                                <p className={styles.description}>{item.description}</p>
                                <ul className={styles.achievements}>
                                    {item.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
