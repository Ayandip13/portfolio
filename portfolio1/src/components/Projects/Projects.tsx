import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData, type Project } from '../../data/portfolio';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import styles from './Projects.module.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Icon mapper (same approach as Skills component)
const iconMap: Record<string, any> = {
    ...FaIcons,
    ...SiIcons,
};

// Technology to icon name mapper
const techIconMap: Record<string, string> = {
    'React Native': 'SiReact',
    'React': 'FaReact',
    'TypeScript': 'SiTypescript',
    'JavaScript': 'FaJs',
    'Redux Toolkit': 'SiRedux',
    'Redux-Toolkit': 'SiRedux',
    'Zustand': 'SiReact',
    'Express.js': 'SiExpress',
    'Express': 'SiExpress',
    'MongoDB': 'SiMongodb',
    'MMKV': 'FaDatabase',
    'Node.js': 'FaNodeJs',
    'Firebase': 'SiFirebase',
    'Tailwind CSS': 'SiTailwindcss',
    'HTML': 'FaHtml5',
    'CSS': 'FaCss3Alt',
    'Git': 'FaGitAlt',
};

export const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { projects } = portfolioData;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section className={styles.projects} id="projects" ref={ref}>
            <motion.div
                className={styles.container}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.h2 className={styles.title} variants={fadeInUp}>
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>

                <motion.div className={styles.grid} variants={staggerContainer}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`${styles.card} glass`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className={styles.cardImage}>
                                <div className={styles.imagePlaceholder}>
                                    <span className={styles.projectIcon}>🚀</span>
                                </div>
                                <div className={styles.overlay} />
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>{project.description}</p>

                                <div className={styles.techTags}>
                                    {project.technologies.slice(0, 3).map((tech) => {
                                        const iconName = techIconMap[tech];
                                        const IconComponent = iconName ? iconMap[iconName] : null;
                                        console.log('Tech:', tech, 'IconName:', iconName, 'Icon:', IconComponent);
                                        return (
                                            <span key={tech} className={styles.tag}>
                                                {IconComponent && <IconComponent className={styles.techIcon} />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                    {project.technologies.length > 3 && (
                                        <span className={styles.tag}>+{project.technologies.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Modal */}
            {selectedProject && (
                <motion.div
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div
                        className={`${styles.modal} glass-strong`}
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                            ✕
                        </button>

                        <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                        <p className={styles.modalCategory}>{selectedProject.category}</p>
                        <p className={styles.modalDescription}>{selectedProject.longDescription}</p>

                        <div className={styles.modalTech}>
                            <h4>Technologies</h4>
                            <div className={styles.techTags}>
                                {selectedProject.technologies.map((tech) => {
                                    const iconName = techIconMap[tech];
                                    const IconComponent = iconName ? iconMap[iconName] : null;
                                    return (
                                        <span key={tech} className={styles.tag}>
                                            {IconComponent && <IconComponent className={styles.techIcon} />}
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                            <div className={styles.modalLinks}>
                                {selectedProject.githubUrl && (
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        View Code
                                    </a>
                                )}
                                {selectedProject.liveUrl && (
                                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};
