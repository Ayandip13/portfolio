import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './Skills.module.css';

export const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { skills } = portfolioData;

    const [activeCategory, setActiveCategory] = useState<string>('All');
    const categories = ['All', 'Frontend', 'Mobile', 'Backend', 'Tools'];

    const filteredSkills =
        activeCategory === 'All'
            ? skills
            : skills.filter((skill) => skill.category === activeCategory);

    return (
        <section className={styles.skills} id="skills" ref={ref}>
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.h2 className={styles.title} variants={fadeInUp}>
                    Skills & <span className="gradient-text-accent">Expertise</span>
                </motion.h2>

                {/* Category Filter */}
                <motion.div className={styles.categories} variants={fadeInUp}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div className={styles.skillsGrid} variants={staggerContainer}>
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className={`${styles.skillCard} glass`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <div className={styles.skillHeader}>
                                <h4 className={styles.skillName}>{skill.name}</h4>
                                <span className={styles.skillCategory}>{skill.category}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                                    transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                                />
                            </div>

                            <span className={styles.proficiency}>{skill.proficiency}%</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};
