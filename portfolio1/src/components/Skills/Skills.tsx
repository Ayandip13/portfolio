import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './Skills.module.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Icon mapper
const iconMap: Record<string, any> = {
    ...FaIcons,
    ...SiIcons,
};

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
                    {filteredSkills.map((skill, index) => {
                        const IconComponent = iconMap[skill.icon];

                        return (
                            <motion.div
                                key={skill.name}
                                className={`${styles.skillCard} glass`}
                                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -15 }}
                                transition={{ delay: index * 0.05, duration: 0.6, type: 'spring' }}
                                whileHover={{ y: -12, scale: 1.05, rotateY: 5 }}
                            >
                                <div className={styles.iconWrapper}>
                                    {IconComponent && <IconComponent className={styles.skillIcon} />}
                                    <div className={styles.iconGlow}></div>
                                </div>

                                <div className={styles.skillContent}>
                                    <h4 className={styles.skillName}>{skill.name}</h4>
                                    <span className={styles.skillCategory}>{skill.category}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
};
