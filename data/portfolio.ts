export const portfolio = {
  name: 'Disha Singh',
  wordmark: 'DEEFOLIO',
  hero: ['Hello, World.', 'I’m Disha Singh.'],
  about: {
    heading: 'I work where data, systems and business decisions meet.',
    paragraphs: [
      'With a Computer Science foundation and experience across analysis and engineering, I turn unclear requirements into structured, testable solutions.',
      'My work moves between data analysis, business research, quality validation and practical problem-solving—the useful space between a question and a decision.',
    ],
    highlights: ['data', 'systems', 'decisions'],
  },
  experiences: [
    { company: 'Ahead Websoft Technologies', role: 'Analyst Trainee', dates: '2025 — Present', location: 'India · Hybrid', description: 'Translated business questions into structured research, analysis and decision-ready reporting.', contributions: ['Clarified requirements and analysis scope', 'Validated findings before stakeholder delivery', 'Built concise reporting views'], technologies: ['Excel', 'SQL', 'Power BI', 'Research'] },
    { company: 'Deccan AI', role: 'AI Output Quality Analyst', dates: '2024 — 2025', location: 'Remote', description: 'Evaluated AI-generated outputs for accuracy, relevance, consistency and adherence to detailed quality criteria.', contributions: ['Applied repeatable quality rubrics', 'Documented edge cases and failure patterns', 'Improved consistency through structured feedback'], technologies: ['AI Evaluation', 'Quality Assurance', 'Annotation'] },
    { company: 'Predigle', role: 'Infra and DevOps Intern', dates: '2023 — 2024', location: 'India · On-site', description: 'Supported infrastructure monitoring and delivery workflows with an emphasis on reliability and clear operational signals.', contributions: ['Observed system health and incidents', 'Supported deployment workflows', 'Documented repeatable operational steps'], technologies: ['Linux', 'Cloud', 'Monitoring', 'DevOps'] },
  ],
  projects: [
    { title: 'Sales Territory and Quota Planning Prototype', problem: 'How can targets stay ambitious without becoming arbitrary?', category: 'Planning Systems', technologies: ['Excel', 'Modeling', 'Scenario Design'], outcome: 'A formula-driven planning model with transparent allocation logic and guardrails.', cover: '', githubUrl: 'https://github.com/dishasingh5422' },
    { title: 'Customer Behaviour and Retention Analysis', problem: 'Which customer signals appear before churn?', category: 'Data Analysis', technologies: ['Python', 'Pandas', 'Power BI'], outcome: 'A focused retention view connecting customer behaviour to practical interventions.', cover: '', githubUrl: 'https://github.com/dishasingh5422' },
    { title: 'Service Monitoring and Incident Alerting System', problem: 'How can a team spot operational trouble earlier?', category: 'Reliability Engineering', technologies: ['Linux', 'Monitoring', 'Automation'], outcome: 'A service-health workflow that turns noisy signals into actionable alerts.', cover: '', githubUrl: 'https://github.com/dishasingh5422' },
    { title: 'Delivery Delay Decision Lab', problem: 'What drives late deliveries, and where should operations intervene first?', category: 'Operations Analytics', technologies: ['SQL', 'Python', 'Dashboarding'], outcome: 'A decision-oriented analysis separating symptoms, drivers and controllable actions.', cover: '', githubUrl: 'https://github.com/dishasingh5422' },
  ],
  visuals: [
    { id: 'signal', backgroundWord: 'SIGNAL', mark: '01↗', caption: 'Finding the useful signal inside the noise.', asset: '' },
    { id: 'structure', backgroundWord: 'STRUCTURE', mark: '[ ]', caption: 'Turning ambiguity into a system that can be tested.', asset: '' },
    { id: 'shift', backgroundWord: 'SHIFT', mark: '∆', caption: 'Small observations. Better decisions.', asset: '' },
  ],
  collaboration: { heading: ['LET’S', 'COLLAB'], prompt: 'Have a role, project or complicated problem worth solving?' },
  contact: {
    github: 'https://github.com/dishasingh5422',
    linkedin: 'https://www.linkedin.com/in/dishasingh5422',
    email: 'dishasingh5422@gmail.com',
    phoneDisplay: '7906045885',
    phoneHref: '+917906045885',
  },
  resumeUrl: '/disha-singh-resume.txt',
} as const;

export type PortfolioData = typeof portfolio;
