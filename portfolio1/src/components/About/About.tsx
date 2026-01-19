import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma, FaApple, FaAndroid } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiFlutter, SiPostgresql, SiMongodb, SiGraphql, SiFirebase, SiWebpack } from 'react-icons/si';
import { portfolioData } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './About.module.css';

const iconMap: Record<string, any> = {
    FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma, FaApple, FaAndroid,
    SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiFlutter, SiPostgresql, SiMongodb,
    SiGraphql, SiFirebase, SiWebpack
};

export const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { about, skills } = portfolioData;

    // Get unique tech stack for display (first 12)
    const displaySkills = skills.slice(0, 12);

    return (
        <section className={styles.about} id="about" ref={ref}>
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.h2 className={styles.title} variants={fadeInUp}>
                    About <span className="gradient-text">Me</span>
                </motion.h2>

                <div className={styles.content}>
                    <motion.div className={`${styles.card} glass`} variants={fadeInUp}>
                        <p className={styles.bio}>{about.bio}</p>
                    </motion.div>

                    <motion.div className={styles.techStack} variants={fadeInUp}>
                        <h3 className={styles.subtitle}>Tech Stack That I've Used</h3>
                        <div className={styles.techGrid}>
                            {displaySkills.map((skill, index) => {
                                const Icon = iconMap[skill.icon];
                                return (
                                    <motion.div
                                        key={index}
                                        className={styles.techItem}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05, duration: 0.5 }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                    >
                                        {Icon && <Icon className={styles.techIcon} />}
                                        <span className={styles.techName}>{skill.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
