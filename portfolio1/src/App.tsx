import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';
import './index.css';

function App() {
  return (
    <div className="App">
      <CustomCursor />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-base)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'var(--text-tertiary)',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 Ayandip Paul. Built with React</p>
      </footer>
    </div>
  );
}

export default App;
