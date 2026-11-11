import type { IconName } from '../shared/icon/icon';

export interface NavLink {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface SkillGroup {
  title: string;
  blurb: string;
  icon: IconName;
  items: string[];
}

export interface Focus {
  title: string;
  text: string;
  icon: IconName;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface Degree {
  level: string;
  title: string;
  school: string;
  place: string;
  year: string;
  score: string;
  icon: IconName;
  detail?: string;
  note?: string;
  featured?: boolean;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface ProjectShot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectImage extends ProjectShot {
  srcset: string;
  host: string;
  phone?: ProjectShot;
}

export interface Project {
  title: string;
  kind: string;
  icon: IconName;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  badge?: string;
  live?: boolean;
  featured?: boolean;
  proprietary?: boolean;
  highlights?: string[];
  flow?: string[];
  hosting?: string;
  image?: ProjectImage;
}

export interface TechChip {
  label: string;
  color: string;
}

export const HERO_TECH: TechChip[] = [
  { label: 'Java', color: '#f89820' },
  { label: 'Angular', color: '#dd0031' },
  { label: 'PostgreSQL', color: '#4f8ec9' },
  { label: 'Git', color: '#f05032' },
];

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/BUSHINIMURALIDHARAN', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bushini-m-98727a257', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:bushinimuralidharan@gmail.com', icon: 'mail' },
];

export const PROFILE = {
  name: 'Bushini M',
  title: 'Java Full Stack Developer',
  role: 'Junior Software Engineer',
  company: 'Paragon Dynamics',
  typedRoles: ['Java Full Stack Developer', 'Spring Boot and Angular', 'PostgreSQL and REST APIs'],
  summary:
    'I design and build enterprise web applications for shipping and logistics: Spring Boot REST services, PostgreSQL-backed workflows and responsive Angular interfaces.',
  location: 'Tamil Nadu, India',
  email: 'bushinimuralidharan@gmail.com',
  phone: '+91 63691 15068',
  phoneHref: 'tel:+916369115068',
  resume: 'bushiniResume.pdf',
  resumeName: 'Bushini_M_Resume.pdf',
  formEndpoint: 'https://formspree.io/f/meenpdvj',
};

export const FOCUS: Focus[] = [
  {
    icon: 'server',
    title: 'Backend and APIs',
    text: 'Spring Boot services, JDBC data access and REST integrations between enterprise systems.',
  },
  {
    icon: 'layout',
    title: 'Frontend',
    text: 'Angular and TypeScript interfaces, plus maintaining AngularJS and JSP modules.',
  },
  {
    icon: 'database',
    title: 'Data',
    text: 'PostgreSQL schemas, stored procedures and query tuning for reporting-heavy workflows.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend',
    blurb: 'APIs and business logic',
    icon: 'server',
    items: ['Java', 'Spring Boot', 'JDBC', 'REST APIs'],
  },
  {
    title: 'Frontend',
    blurb: 'Interfaces that stay maintainable',
    icon: 'layout',
    items: ['Angular', 'TypeScript', 'AngularJS', 'JSP', 'JavaScript', 'HTML and CSS'],
  },
  {
    title: 'Database',
    blurb: 'Modelling, tuning and migrations',
    icon: 'database',
    items: ['PostgreSQL', 'SQL', 'Stored procedures', 'Query optimisation'],
  },
  {
    title: 'Tools and delivery',
    blurb: 'Shipping code reliably',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'Maven', 'Netlify', 'Vercel', 'Render', 'MQTT'],
  },
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Junior Software Engineer',
    company: 'Paragon Dynamics Info System Pvt Ltd',
    period: 'May 2025 - Present',
    points: [
      'Java Full Stack Developer on enterprise projects for shipping lines.',
      'Build and maintain web applications with Java, Spring Boot, AngularJS, JSP and PostgreSQL.',
      'Contributed to logistics and shipping modules, including Bill of Lading (BL) processing, invoicing and workflow management.',
      'SQL query optimisation, stored procedures, REST API integration and backend debugging.',
    ],
    stack: ['Java', 'Spring Boot', 'AngularJS', 'JSP', 'PostgreSQL', 'REST'],
  },
];

export const EDUCATION: Degree[] = [
  {
    featured: true,
    level: 'Undergraduate degree',
    title: 'B.E. in Information Technology',
    school: 'Hindusthan Institute of Technology',
    detail: 'Affiliated to Anna University',
    place: 'Coimbatore, India',
    year: '2025',
    score: 'CGPA 8.31',
    icon: 'cap',
    note: 'Won 2nd place in a paper presentation at a college cultural event.',
  },
  {
    level: 'Higher secondary',
    title: 'HSC',
    school: 'Municipal Girls Hr. Sec. School',
    place: 'Tiruvannamalai, Tamil Nadu',
    year: '2021',
    score: '80.66%',
    icon: 'book',
  },
  {
    level: 'Secondary school',
    title: 'SSLC',
    school: 'Bhagavan Hr. Sec. School',
    place: 'Tiruvannamalai, Tamil Nadu',
    year: '2019',
    score: '74.8%',
    icon: 'book',
  },
];

export const PROJECTS: Project[] = [
  {
    featured: true,
    title: 'Blossom Boutique',
    kind: 'Full-stack e-commerce',
    badge: 'Live',
    live: true,
    icon: 'bag',
    summary:
      'An online boutique with a customer storefront and an admin console, covering the catalogue, UPI checkout, order tracking and automated e-mails.',
    highlights: [
      'Storefront with catalogue, search, bag, wishlist and checkout',
      'UPI payment flow with admin verification and order tracking',
      'Admin console for orders, returns, messages and store settings',
      'Automated customer and shop e-mails for order events',
    ],
    flow: ['Angular storefront', 'Spring Boot API', 'PostgreSQL'],
    hosting: 'Deployed on Vercel, Render and Neon',
    image: {
      src: 'blossom-desktop-1280.webp',
      srcset: 'blossom-desktop-640.webp 640w, blossom-desktop-1280.webp 1280w',
      width: 1280,
      height: 800,
      alt: 'Blossom Boutique storefront on a desktop screen: navigation with search, wishlist and bag above a full-width hero banner',
      host: 'blossom-frontend-murex.vercel.app',
      phone: {
        src: 'blossom-mobile.webp',
        width: 320,
        height: 693,
        alt: 'The same storefront on a phone, with a bottom tab bar',
      },
    },
    stack: ['Angular', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'REST API'],
    links: [
      { label: 'Live site', href: 'https://blossom-frontend-murex.vercel.app', icon: 'arrow-up-right' },
      { label: 'Source', href: 'https://github.com/BUSHINIMURALIDHARAN/blossom-boutique', icon: 'github' },
    ],
  },
  {
    title: 'Shipping Line Management System',
    kind: 'Enterprise application',
    badge: 'Company project',
    icon: 'box',
    summary:
      'Modules for a shipping-line application: Bill of Lading processing, invoice generation and approval workflows, backed by PostgreSQL stored procedures and REST integrations.',
    stack: ['Java', 'Spring Boot', 'AngularJS', 'JSP', 'PostgreSQL'],
    proprietary: true,
    links: [],
  },
  {
    title: 'IoT Enhanced Safety System',
    kind: 'IoT project',
    icon: 'cpu',
    summary:
      'A gas leak prevention and monitoring system that uses MQTT messaging to connect devices and report readings.',
    stack: ['IoT', 'MQTT'],
    links: [],
  },
];

export function experienceYears(now = new Date()): string {
  const months = (now.getFullYear() - 2025) * 12 + (now.getMonth() - 4);
  const halves = Math.max(2, Math.floor(months / 6));
  return `${halves / 2}+`;
}
