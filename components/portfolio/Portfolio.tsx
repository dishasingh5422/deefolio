'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { CustomVisual } from './CustomVisual';
import { usePortfolioMotion } from './usePortfolioMotion';

const menuItems = [
  ['Home', 'hero'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
] as const;

const contacts = [
  { label: 'GitHub profile', tooltip: 'GitHub', href: portfolio.contact.github, icon: Github, external: true },
  { label: 'LinkedIn profile', tooltip: 'LinkedIn', href: portfolio.contact.linkedin, icon: Linkedin, external: true },
  { label: `Email ${portfolio.contact.email}`, tooltip: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail, external: false },
  { label: `Call ${portfolio.contact.phoneDisplay}`, tooltip: 'Phone', href: `tel:${portfolio.contact.phoneHref}`, icon: Phone, external: false },
] as const;

function AboutHeading() {
  const highlighted = new Set<string>(portfolio.about.highlights);
  return (
    <h2 className="about-heading about-piece" id="about-title">
      {portfolio.about.heading.split(' ').map((word, index) => {
        const cleanWord = word.replace(/[.,]/g, '');
        return (
          <span className={highlighted.has(cleanWord) ? 'about-word is-highlighted' : 'about-word'} key={`${word}-${index}`}>
            {word}{' '}
          </span>
        );
      })}
    </h2>
  );
}

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuItem = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  usePortfolioMotion(root);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 20);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) window.setTimeout(() => firstMenuItem.current?.focus(), 80);
    if (!menuOpen && wasMenuOpen.current) menuButton.current?.focus();
    wasMenuOpen.current = menuOpen;
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const menu = document.getElementById('site-menu');
      const focusable = menu?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleMenuKeys);
    return () => window.removeEventListener('keydown', handleMenuKeys);
  }, [menuOpen]);

  return (
    <div ref={root} className="site-frame">
      <a className="skip-link" href="#about">Skip to portfolio content</a>
      <button className="site-wordmark" type="button" onClick={() => scrollTo('hero')}>
        {portfolio.wordmark}
      </button>
      <button
        ref={menuButton}
        className="menu-trigger"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <aside className="contact-rail" aria-label="Contact links">
        {contacts.map(({ label, tooltip, href, icon: Icon, external }) => (
          <a
            className="contact-link"
            key={tooltip}
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            <span className="contact-label" aria-hidden="true">{tooltip}</span>
          </a>
        ))}
      </aside>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Primary navigation">
              <ul className="menu-list">
                {menuItems.map(([label, id], index) => (
                  <li key={id}>
                    <button
                      ref={index === 0 ? firstMenuItem : undefined}
                      className="menu-link"
                      type="button"
                      onClick={() => scrollTo(id)}
                    >
                      <span>{label}</span><span className="menu-index">0{index + 1}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <a className="menu-link" href={portfolio.resumeUrl} download>
                    <span>Download Résumé</span><span className="menu-index">TXT</span>
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="scene hero" id="hero" aria-labelledby="hero-title">
          <h1 className="hero-copy" id="hero-title">
            <span className="hero-line">{portfolio.hero[0]}</span>
            <span className="hero-line">{portfolio.hero[1]}</span>
          </h1>
          <div className="scroll-cue" aria-hidden="true">Scroll to read</div>
        </section>

        <section className="scene about" id="about" aria-labelledby="about-title">
          <div className="about-content">
            <p className="section-kicker about-piece">About / 01</p>
            <AboutHeading />
            <div className="about-copy">
              {portfolio.about.paragraphs.map((paragraph) => <p className="about-paragraph about-piece" key={paragraph}>{paragraph}</p>)}
            </div>
            <span className="about-marker about-piece" aria-hidden="true">DATA → DECISION</span>
          </div>
        </section>

        <CustomVisual visual={portfolio.visuals[0]} index={0} />

        <section className="scene experience" id="experience" aria-labelledby="experience-title">
          <header className="section-header">
            <p className="section-kicker experience-heading-piece">Experience / 02</p>
            <h2 className="section-title experience-heading-piece" id="experience-title">Work, in context.</h2>
          </header>
          <div className={`experience-list ${hoveredExperience !== null ? 'has-active' : ''}`}>
            {portfolio.experiences.map((experience, index) => (
              <article
                className={`experience-entry ${hoveredExperience === index ? 'is-active' : ''}`}
                key={experience.company}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <div className="experience-inner">
                  <div className="experience-primary">
                    <span className="entry-number">0{index + 1}</span>
                    <h3>{experience.company}</h3>
                    <p>{experience.role}</p>
                  </div>
                  <div className="experience-meta"><span>{experience.dates}</span><span>{experience.location}</span></div>
                  <div className="experience-detail">
                    <p>{experience.description}</p>
                    <ul>{experience.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
                    <p className="technology-line">{experience.technologies.join(' · ')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CustomVisual visual={portfolio.visuals[1]} index={1} />

        <section className="scene projects" id="projects" aria-labelledby="projects-title">
          <div className="projects-stage">
            <header className="section-header projects-header">
              <p className="section-kicker">Selected work / 03</p>
              <h2 className="section-title" id="projects-title">Problems made legible.</h2>
            </header>
            <div className={`project-grid ${hoveredProject !== null ? 'has-active' : ''}`}>
              {portfolio.projects.map((project, index) => (
                <article
                  className={`project-card project-card-${index + 1} ${hoveredProject === index ? 'is-active' : ''}`}
                  key={project.title}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="project-surface">
                    <div className="project-cover" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <i /><i /><i />
                    </div>
                    <div className="project-copy">
                      <p className="project-category">{project.category}</p>
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.outcome}</p>
                      <p className="technology-line">{project.technologies.join(' · ')}</p>
                      <a
                        className="project-link"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        View project <ArrowUpRight aria-hidden="true" size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CustomVisual visual={portfolio.visuals[2]} index={2} />

        <section className="scene collaborate" id="contact" aria-labelledby="collab-title">
          <div className="collab-content">
            <p className="section-kicker">Contact / 04</p>
            <h2 className="collab-heading" id="collab-title">
              {portfolio.collaboration.heading.map((word) => <span className="collab-word" key={word}>{word}</span>)}
            </h2>
            <div className="collab-detail">
              <p>{portfolio.collaboration.prompt}</p>
              <div className="collab-actions">
                <a href={`mailto:${portfolio.contact.email}`} aria-label={`Email ${portfolio.contact.email}`}>
                  {portfolio.contact.email} <ArrowUpRight aria-hidden="true" size={17} />
                </a>
                <a href={`tel:${portfolio.contact.phoneHref}`} aria-label={`Call ${portfolio.contact.phoneDisplay}`}>
                  {portfolio.contact.phoneDisplay} <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
