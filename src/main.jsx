
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

import {
  ArrowUpRight,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  UserRound,
  House,
  Copy,
  Check,
  Cpu,
  Globe,
  CalendarDays,
  Layers,
  FileText,
  ChevronRight,
  Code2,
  PanelsTopLeft,
  ExternalLink,
} from "lucide-react";

import * as BrandIcons from "react-icons/si";
import "./style.css";

// ============================================================
// PERSONAL INFORMATION
// ============================================================

const email = "jamescruzpotot30@gmail.com";

// ============================================================
// TECHNOLOGY ICON HELPER
// Avoids crashing when an icon is missing from react-icons.
// ============================================================

function TechIcon({ name, size = 24 }) {
  const Icon = BrandIcons[name];

  if (!Icon) {
    return <Code2 size={size} strokeWidth={1.8} />;
  }

  return <Icon size={size} />;
}

// ============================================================
// NAVIGATION
// ============================================================

const NAV = [
  {
    to: "/",
    name: "Overview",
    icon: House,
    index: "01",
  },
  {
    to: "/about",
    name: "About",
    icon: UserRound,
    index: "02",
  },
  {
    to: "/technologies",
    name: "Technologies",
    icon: Code2,
    index: "03",
  },
  {
    to: "/projects",
    name: "Projects",
    icon: PanelsTopLeft,
    index: "04",
  },
  {
    to: "/certifications",
    name: "Certifications",
    icon: Award,
    index: "05",
  },
  {
    to: "/contact",
    name: "Contact",
    icon: Mail,
    index: "06",
  },
];

// ============================================================
// PROJECT DATA
// ============================================================

const projects = [
  {
    id: "01",
    name: "ScenicLens Platform",
    cat: "Thesis · Computer vision",
    year: "2026",
    type: "Research",
    label: "FEATURED RESEARCH",
    desc:
      "A scenic evaluation and visitor-feedback platform designed to support evidence-based destination management at Mt. Pamitinan.",
    stack: [
      "Next.js",
      "Python",
      "Machine Learning",
      "Raspberry Pi",
    ],
    visual: "scenic",
  },
  {
    id: "02",
    name: "NoiseX",
    cat: "Digital signal processing",
    year: "2026",
    type: "Software",
    label: "AUDIO EXPERIMENT",
    desc:
      "An adjustable audio noise-reduction interface with waveform analysis, spectrum visualization, and reconstructed playback.",
    stack: ["Python", "JavaScript", "DSP"],
    visual: "noise",
  },
  {
    id: "03",
    name: "Smart Irrigation",
    cat: "Embedded systems · IoT",
    year: "2025",
    type: "Hardware",
    label: "CONNECTED SYSTEM",
    desc:
      "ESP32-based automated irrigation with soil and climate sensing, Blynk remote controls, and weather-aware decisions.",
    stack: ["ESP32", "Blynk", "C++", "WeatherAPI"],
    visual: "irrigation",
  },
  {
    id: "04",
    name: "Templyst",
    cat: "Independent design practice",
    year: "2026",
    type: "Web",
    label: "DIGITAL PRODUCTS",
    desc:
      "A collection of purposeful website concepts and reusable web templates for different industries.",
    stack: ["HTML", "CSS", "JavaScript", "UI/UX"],
    visual: "templyst",
  },
];

// ============================================================
// TECHNOLOGY STACK
// Icon names are resolved safely at runtime.
// ============================================================

const stacks = [
  {
    name: "Interface & web",
    note: "Where structure becomes experience.",
    items: [
      ["HTML5", "SiHtml5", "#e34f26"],
      ["CSS3", "SiCss", "#1572b6"],
      ["JavaScript", "SiJavascript", "#d6b500"],
      ["PHP", "SiPhp", "#777bb4"],
      ["React", "SiReact", "#149eca"],
      ["Next.js", "SiNextdotjs", "currentColor"],
    ],
  },
  {
    name: "Programming & data",
    note: "The logic beneath the interface.",
    items: [
      ["Python", "SiPython", "#3776ab"],
      ["MySQL", "SiMysql", "#4479a1"],
      ["Supabase", "SiSupabase", "#3ecf8e"],
    ],
  },
  {
    name: "Embedded & prototyping",
    note: "Bridging digital and physical systems.",
    items: [
      ["ESP32", "SiEspressif", "#e7352a"],
      ["Arduino", "SiArduino", "#00878f"],
    ],
  },
  {
    name: "Workflow & design",
    note: "Tools for building and shipping.",
    items: [
      ["Git", "SiGit", "#f05032"],
      ["GitHub", "SiGithub", "currentColor"],
      ["Figma", "SiFigma", "#a259ff"],
      ["Vercel", "SiVercel", "currentColor"],
    ],
  },
];

// ============================================================
// CERTIFICATION DATA
// ============================================================


const certs = [
  {
    org: "Google / Coursera",
    name: "Technical Support",
    detail:
      "Foundational IT support concepts, troubleshooting, and technical problem-solving.",
    year: "Credential",
    filename: "GoogleCert-Tech.jpeg",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/JH1YNDX5F8GA",
    short: "GOOGLE",
    mark: "G",
    theme: "google",
  },
  {
    org: "Canva",
    name: "Canva Essentials",
    detail:
      "Core design principles, visual communication, and Canva design workflows.",
    year: "Credential",
    filename: "Canva.png",
    verifyUrl:
      "https://www.canva.com/en/design-school/certification-award/99b79070-3c28-41e4-bc15-b317c1160c9c",
    short: "CANVA",
    mark: "C",
    theme: "canva",
  },
  {
    org: "Accenture / FutureLearn",
    name: "Digital Skills: User Experience",
    detail:
      "User experience design concepts and approaches to creating user-centered digital products.",
    year: "Credential",
    filename: "Accenture.png",
    verifyUrl:
      "https://www.futurelearn.com/certificates/r5be8u2",
    short: "ACCENTURE",
    mark: "A",
    theme: "accenture",
  },
];


// ============================================================
// THEME MANAGEMENT
// ============================================================

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("jp-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem("jp-theme", theme);
    } catch {
      // Ignore storage errors.
    }
  }, [theme]);

  return [theme, setTheme];
}

function ThemeButton({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="icon-btn theme-btn"
      aria-label={`Switch to ${
        theme === "light" ? "dark" : "light"
      } mode`}
      title="Toggle appearance"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon size={17} />
      ) : (
        <Sun size={17} />
      )}
    </button>
  );
}

// ============================================================
// MAIN APP LAYOUT
// ============================================================




function App() {
  const [theme, setTheme] = useTheme();
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobile(false);
  }, [location.pathname]);

  const pages = [
    { to: "/", name: "Introduction" },
    { to: "/about", name: "About" },
    { to: "/technologies", name: "Technologies" },
    { to: "/projects", name: "Selected Work" },
    { to: "/certifications", name: "Certifications" },
    { to: "/contact", name: "Contact" },
  ];

  const GithubIcon = BrandIcons.SiGithub;
  const LinkedinIcon = BrandIcons.SiLinkedin;

  // Add your real links here when available.
  const githubUrl = "#";
  const linkedinUrl = "#";

  return (
    <div className="app-shell editorial-shell">

      {/* SIDEBAR */}

      <aside
        className={`sidebar editorial-sidebar ${
          mobile ? "is-open" : ""
        }`}
      >
        <div className="editorial-brand">
          <Link to="/">James Potot</Link>
          <span>Personal Portfolio · 2026</span>

          <button
            className="icon-btn mobile-close"
            onClick={() => setMobile(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="editorial-nav-heading">
          Contents
        </div>

        <nav
          className="editorial-nav"
          aria-label="Portfolio navigation"
        >
          {pages.map((page, index) => (
            <NavLink
              key={page.to}
              to={page.to}
              end={page.to === "/"}
              className={({ isActive }) =>
                `editorial-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              {page.name}
            </NavLink>
          ))}
        </nav>

        {/* SOCIALS AND CONTACT */}

        <div className="editorial-sidebar-footer">
          <div className="rail-contact-heading">
            CONNECT
          </div>

          <a
            className="rail-email"
            href={`mailto:${email}`}
          >
            {email}
          </a>

          <div className="rail-socials">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                {GithubIcon ? (
                  <GithubIcon size={19} />
                ) : (
                  "GH"
                )}
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {LinkedinIcon ? (
                  <LinkedinIcon size={19} />
                ) : (
                  "in"
                )}
              </a>
            )}

            <a
              href={`mailto:${email}`}
              aria-label="Send email"
              title="Email"
            >
              <Mail size={19} />
            </a>
          </div>

          <span className="rail-copyright">
            © 2026 James Potot
          </span>
        </div>
      </aside>

      {/* MOBILE BACKDROP */}

      {mobile && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}

      {/* MAIN AREA */}

      <div className="main-area">

        {/* HEADER */}

        <header className="topbar editorial-topbar">

          <div className="topbar-left">
            <button
              className="icon-btn menu-btn"
              onClick={() => setMobile(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <span className="route-path">
              JAMES POTOT / PERSONAL PORTFOLIO
            </span>
          </div>

          <div className="topbar-right">
            <span className="topline-year">2026</span>

            {/* ONE THEME BUTTON ONLY */}

            <ThemeButton
              theme={theme}
              setTheme={setTheme}
            />
          </div>

        </header>

        {/* ROUTES */}

        <main className="page-content">

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/technologies"
              element={<Technologies />}
            />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/certifications"
              element={<Certifications />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="*"
              element={<Missing />}
            />
          </Routes>

        </main>

        {/* FOOTER */}

        <footer className="page-footer editorial-footer">
          <span>
            Independent work & selected studies
          </span>

          <span>
            © 2026 James Potot
          </span>
        </footer>

      </div>

    </div>
  );
}

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

function Eyebrow({ index, children }) {
  return (
    <div className="eyebrow">
      <span className="index-square">
        {index}
      </span>

      {children}
    </div>
  );
}

function PageIntro({ index, eyebrow, title, desc }) {
  return (
    <div className="page-intro">
      <Eyebrow index={index}>
        {eyebrow}
      </Eyebrow>

      <h1>{title}</h1>

      <p>{desc}</p>
    </div>
  );
}

// ============================================================
// PAGE 01 — OVERVIEW
// ============================================================


function Home() {
  const GithubIcon = BrandIcons.SiGithub;
  const LinkedinIcon = BrandIcons.SiLinkedin;

  // Replace with your actual links later.
  const githubUrl = "";
  const linkedinUrl = "";

  const coreTechnologies = [
    { name: "HTML5", icon: "SiHtml5", color: "#e34f26" },
    { name: "CSS3", icon: "SiCss", color: "#1572b6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#d6b500" },
    { name: "Python", icon: "SiPython", color: "#3776ab" },
    { name: "React", icon: "SiReact", color: "#149eca" },
  ];

  return (
    <div className="intro-page intro-v5">
      <div className="intro-top">
        <span>01 / INTRODUCTION</span>
        <span>DESIGN · SOFTWARE · ENGINEERING</span>
      </div>

      <div className="intro-v5-layout">
        {/* LEFT — PERSONAL INTRODUCTION */}

        <section className="intro-v5-primary">
          <p className="intro-v5-hello">Hello, I'm</p>

          <h1 className="intro-v5-name">
            James
            <br />
            Potot<span>.</span>
          </h1>

          <p className="intro-v5-role">
            Computer Engineering Student
            <span> / </span>
            Web Developer
          </p>

          <p className="intro-v5-description">
            I design and build{" "}
            <strong>thoughtful digital experiences</strong>{" "}
            and explore technologies that connect software
            with the physical world.
          </p>

          <div className="intro-v5-actions">
            <Link to="/projects">
              Explore my work <span>→</span>
            </Link>

            <Link to="/about">
              More about me <span>→</span>
            </Link>
          </div>

          <div className="intro-v5-personal">
            <span>MY APPROACH</span>
            <p>
              Purposeful design, practical engineering,
              and continuous learning.
            </p>
          </div>
        </section>

        {/* RIGHT — PROFESSIONAL HIGHLIGHTS */}

        <aside className="intro-v5-highlights">
          <div className="intro-v5-highlights-heading">
            <span>PROFILE AT A GLANCE</span>
            <span>2026</span>
          </div>

          {/* SELECTED PROJECT */}

          <section className="v5-highlight">
            <div className="v5-section-heading">
              <span>01 / SELECTED WORK</span>
              <Link to="/projects">View all →</Link>
            </div>

            <Link to="/projects" className="v5-project-preview">
              <div>
                <span className="v5-overline">
                  RESEARCH / COMPUTER VISION
                </span>

                <h2>ScenicLens Platform</h2>

                <p>
                  A scenic evaluation and visitor-feedback
                  platform supporting destination management.
                </p>
              </div>

              <span className="v5-inline-link">
                Explore project →
              </span>
            </Link>
          </section>

          {/* RECENT / FEATURED CERTIFICATION */}

          <section className="v5-highlight">
            <div className="v5-section-heading">
              <span>02 / FEATURED CREDENTIAL</span>
              <Link to="/certifications">View all →</Link>
            </div>

            <Link
              to="/certifications"
              className="v5-certification-preview"
            >
              <div className="v5-certification-thumb">
                <img
                src="/certificates/Accenture.png"
                alt="Accenture Digital Skills: User Experience Certificate"
                />
                <span>UX</span>
              </div>

              <div className="v5-certification-info">
                <span>ACCENTURE / FORAGE</span>
                <h3>Digital Skills: User Experience</h3>
                <p>Applied user experience principles</p>
              </div>

              <span className="v5-chevron">→</span>
            </Link>
          </section>

          {/* MAIN TECHNOLOGIES */}

          <section className="v5-highlight">
            <div className="v5-section-heading">
              <span>03 / CORE TECHNOLOGIES</span>
              <Link to="/technologies">View all →</Link>
            </div>

            <div className="v5-technologies">
              {coreTechnologies.map((technology) => (
                <div
                  className="v5-technology"
                  key={technology.name}
                  title={technology.name}
                >
                  <span style={{ color: technology.color }}>
                    <TechIcon
                      name={technology.icon}
                      size={21}
                    />
                  </span>

                  <span>{technology.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT & SOCIALS */}

          <section className="v5-highlight v5-contact-highlight">
            <div className="v5-section-heading">
              <span>04 / CONNECT</span>
              <Link to="/contact">Contact →</Link>
            </div>

            <div className="v5-connect-row">
              <a href={`mailto:${email}`} className="v5-email">
                {email}
              </a>

              <div className="v5-socials">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    {GithubIcon ? (
                      <GithubIcon size={19} />
                    ) : (
                      "GH"
                    )}
                  </a>
                )}

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    {LinkedinIcon ? (
                      <LinkedinIcon size={19} />
                    ) : (
                      "in"
                    )}
                  </a>
                )}

                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  title="Email"
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="intro-v5-bottom">
        <span>INDEPENDENT WORK / SELECTED STUDIES</span>
        <Link to="/about">Discover my background →</Link>
      </div>
    </div>
  );
}

// ============================================================
// PAGE 02 — ABOUT
// ============================================================

function About() {
  const facts = [
    {
      icon: GraduationCap,
      label: "EDUCATION",
      value: "BS Computer Engineering",
      sub: "Colegio de Montalban",
    },
    {
      icon: MapPin,
      label: "BASED IN",
      value: "Rizal, Philippines",
      sub: "Working across web & hardware",
    },
    {
      icon: Layers,
      label: "MAIN FOCUS",
      value: "Development & prototyping",
      sub: "Web / UI / Embedded",
    },
    {
      icon: CalendarDays,
      label: "CURRENT CHAPTER",
      value: "Building & learning",
      sub: "Class of 2027 (expected)",
    },
  ];

  return (
    <div className="page">

      <PageIntro
        index="02"
        eyebrow="BACKGROUND / PERSONAL PROFILE"
        title={
          <>
            A little more <em>human.</em>
          </>
        }
        desc="The path, perspective, and curiosity behind the work."
      />

      <div className="about-layout">

        <div className="about-story">

          <div className="section-line-label">
            01 / IN MY OWN WORDS
          </div>

          <h2>
            I enjoy making technology{" "}
            <em>feel understandable.</em>
          </h2>

          <p>
            I'm James, a Bachelor of Science in
            Computer Engineering student at Colegio
            de Montalban. My interests sit at the
            intersection of web development,
            thoughtful UI design, and physical
            computing.
          </p>

          <p>
            Whether I’m working on a website, a
            research prototype, or a microcontroller-based
            system, I approach each project with
            the same goal: solve something real and
            make the result clear, reliable, and useful.
          </p>

          <p>
            I’m continuously learning—especially
            where programming, machine learning,
            and embedded hardware overlap.
          </p>

        </div>

        <div className="about-facts">

          <div className="section-line-label">
            02 / QUICK FACTS
          </div>

          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div className="fact" key={fact.label}>
                <Icon size={20} />

                <div>
                  <small>{fact.label}</small>
                  <strong>{fact.value}</strong>
                  <span>{fact.sub}</span>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      <div className="quote-band">
        <span>WORKING PRINCIPLE / 001</span>

        <p>
          “Keep the interface simple. Keep the
          thinking behind it rigorous.”
        </p>
      </div>

    </div>
  );
}

// ============================================================
// PAGE 03 — TECHNOLOGIES
// ============================================================

function Technologies() {
  return (
    <div className="page">

      <PageIntro
        index="03"
        eyebrow="TOOLS / PRACTICE"
        title={
          <>
            My working <em>toolkit.</em>
          </>
        }
        desc="A practical collection of the languages, technologies, and tools I use or explore. Proficiency varies across technologies."
      />

      <div className="stack-grid">

        {stacks.map((group, index) => (
          <section
            className="stack-panel"
            key={group.name}
          >

            <div className="stack-heading">

              <span className="small-index">
                0{index + 1} / CATEGORY
              </span>

              <h2>{group.name}</h2>

              <p>{group.note}</p>

            </div>

            <div className="stack-items">

              {group.items.map(
                ([name, iconName, color]) => (
                  <div
                    className="stack-item"
                    key={name}
                  >

                    <span
                      className="tech-logo"
                      style={{ color }}
                    >
                      <TechIcon
                        name={iconName}
                        size={24}
                      />
                    </span>

                    <span>{name}</span>

                  </div>
                )
              )}

            </div>

          </section>
        ))}

      </div>

      <p className="footnote">
        * My strongest foundation is HTML and CSS;
        other tools are part of ongoing projects
        and learning.
      </p>

    </div>
  );
}

// ============================================================
// PROJECT ART COMPONENT
// ============================================================

function ProjectArt({ visual }) {
  return (
    <div
      className={`project-art project-art-${visual}`}
      aria-hidden="true"
    >

      {/* SCENICLENS */}

      {visual === "scenic" && (
        <>
          <span className="art-kicker">
            SCENICLENS / RESEARCH
          </span>

          <div className="landscape-lines">
            <span />
            <span />
            <span />
          </div>

          <div className="art-panel">
            SCENIC SCORE

            <strong>
              08.6<span>/ 10</span>
            </strong>
          </div>
        </>
      )}

      {/* NOISEX */}

      {visual === "noise" && (
        <>
          <span className="art-kicker">
            NOISEX / SIGNAL LAB
          </span>

          <div className="waveform">
            {Array.from({ length: 43 }, (_, i) => {
              const height =
                16 +
                Math.abs(
                  Math.sin(i * 0.82) *
                  Math.cos(i * 0.19)
                ) *
                  72;

              return (
                <i
                  key={i}
                  style={{
                    height: `${height}%`,
                  }}
                />
              );
            })}
          </div>

          <span className="art-bottom">
            SIGNAL IN → SIGNAL OUT
          </span>
        </>
      )}

      {/* SMART IRRIGATION */}

      {visual === "irrigation" && (
        <>
          <span className="art-kicker">
            SMART IRRIGATION / IOT
          </span>

          <div className="sensor-orbit">

            <Cpu size={54} strokeWidth={1} />

            <span className="dot one" />
            <span className="dot two" />
            <span className="dot three" />

          </div>

          <div className="art-bottom">
            ESP32 / MONITOR / AUTOMATE
          </div>
        </>
      )}

      {/* TEMPLYST */}

      {visual === "templyst" && (
        <>
          <span className="art-kicker">
            TEMPLYST / DIGITAL DESIGN
          </span>

          <div className="mock-browser">

            <div className="mock-browser-bar">
              <i />
              <i />
              <i />
            </div>

            <div className="mock-browser-content">

              <span>
                designed to be
                <br />
                <strong>different.</strong>
              </span>

              <div />

            </div>

          </div>
        </>
      )}

    </div>
  );
}

// ============================================================
// PAGE 04 — PROJECTS
// ============================================================

function Projects() {
  const [filter, setFilter] = useState("All");

  const filters = [
    "All",
    "Research",
    "Software",
    "Hardware",
    "Web",
  ];

  const visible = projects.filter(
    (project) =>
      filter === "All" || project.type === filter
  );

  return (
    <div className="page">

      <PageIntro
        index="04"
        eyebrow="ARCHIVE / SELECTED WORK"
        title={
          <>
            Things I've <em>built.</em>
          </>
        }
        desc="Research, functional prototypes, and digital explorations. A selection of the problems I’ve chosen to work on."
      />

      <div className="filterbar">

        <span className="small-index">
          FILTER / {String(visible.length).padStart(2, "0")} ENTRIES
        </span>

        <div className="filters">

          {filters.map((item) => (
            <button
              key={item}
              className={`filter-btn ${
                filter === item ? "selected" : ""
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      <div className="projects-grid">

        {visible.map((project) => (
          <article
            className="project-card"
            key={project.id}
          >

            <ProjectArt visual={project.visual} />

            <div className="project-info">

              <div className="project-topline">
                <span>
                  {project.id} / {project.label}
                </span>

                <span>{project.year}</span>
              </div>

              <h2>
                {project.name}
                <ArrowUpRight size={23} />
              </h2>

              <p className="project-category">
                {project.cat}
              </p>

              <p className="project-desc">
                {project.desc}
              </p>

              <div className="project-stack">

                {project.stack.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}

              </div>

              <div className="project-bottom">

                <span>PROJECT OVERVIEW</span>

                <span>
                  CASE STUDY DETAILS AVAILABLE ON REQUEST
                  <ArrowUpRight size={14} />
                </span>

              </div>

            </div>

          </article>
        ))}

      </div>

    </div>
  );
}

// ============================================================
// CERTIFICATE IMAGE PREVIEW
// ============================================================


function CertPreview({ c }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [c.filename]);

  return (
    <a
      className={`cert-preview ${c.theme}`}
      href={c.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify ${c.name} certificate`}
      title={`Verify ${c.name}`}
    >
      {!imageError ? (
        <img
          src={`/certificates/${c.filename}`}
          alt={`${c.name} certificate`}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="cert-placeholder">
          <div className="cert-brand-row">
            <div className="cert-mark">
              {c.mark}
            </div>

            <span>{c.short}</span>
          </div>

          <div className="cert-faux-rule" />

          <div className="cert-preview-label">
            CERTIFICATE
          </div>

          <strong>{c.name}</strong>
        </div>
      )}

      <span className="cert-verify-overlay">
        <ExternalLink size={16} />
        Verify credential
      </span>
    </a>
  );
}


// ============================================================
// PAGE 05 — CERTIFICATIONS
// ============================================================



function Certifications() {
  return (
    <div className="page">
      <PageIntro
        index="05"
        eyebrow="LEARNING / CREDENTIALS"
        title={
          <>
            Always in <em>progress.</em>
          </>
        }
        desc="A collection of completed certifications and professional learning experiences."
      />

      <div className="cert-list">
        {certs.map((certificate, index) => (
          <article
            className="cert-card"
            key={certificate.name}
          >
            {/* CLICKABLE CERTIFICATE IMAGE */}

            <CertPreview c={certificate} />

            {/* CERTIFICATE INFORMATION */}

            <div className="cert-detail">
              <span className="small-index">
                0{index + 1} /{" "}
                {certificate.year.toUpperCase()}
              </span>

              <div className="cert-org">
                {certificate.org}
              </div>

              <h2>{certificate.name}</h2>

              <p>{certificate.detail}</p>

              <div className="cert-foot">
                <Award size={17} />

                <span>Completed certification</span>
              </div>

              <a
                className="cert-verify-link"
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify credential
                <ExternalLink size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}



// ============================================================
// PAGE 06 — CONTACT
// ============================================================

function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="page">

      <PageIntro
        index="06"
        eyebrow="CONTACT / GET IN TOUCH"
        title={
          <>
            Start a <em>conversation.</em>
          </>
        }
        desc="Interested in collaborating on a web project, digital concept, or thoughtful engineering experiment? I'd be glad to hear from you."
      />

      <div className="contact-layout">

        <div className="contact-main">

          <span className="small-index">
            THE MOST DIRECT ROUTE
          </span>

          <h2>
            Have something
            <br />
            in mind?
          </h2>

          <a
            className="contact-email"
            href={`mailto:${email}`}
          >
            {email}
            <ArrowUpRight size={25} />
          </a>

          <button
            className="copy-btn"
            onClick={copy}
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}

            {copied
              ? "Email copied"
              : "Copy email address"}
          </button>

        </div>

        <div className="contact-sidebar">

          <div className="section-line-label">
            CONTACT CARD / 2026
          </div>

          <div className="contact-fact">
            <MapPin size={19} />

            <div>
              <small>LOCATION</small>
              <strong>Rizal, Philippines</strong>
            </div>
          </div>

          <div className="contact-fact">
            <GraduationCap size={19} />

            <div>
              <small>BACKGROUND</small>
              <strong>Computer Engineering</strong>
            </div>
          </div>

          <div className="contact-fact">
            <Globe size={19} />

            <div>
              <small>AVAILABILITY</small>

              <strong>
                Open to meaningful collaborations
              </strong>
            </div>
          </div>

          <div className="contact-advice">
            Social profiles aren't linked until
            verified. Add your own GitHub and
            LinkedIn URLs in the source when
            you're ready.
          </div>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// 404 PAGE
// ============================================================

function Missing() {
  return (
    <div className="page">

      <PageIntro
        index="—"
        eyebrow="NOT FOUND"
        title="Nothing here yet."
        desc="This page doesn’t exist."
      />

      <Link
        className="button-primary"
        to="/"
      >
        Back to overview
        <ArrowRight size={17} />
      </Link>

    </div>
  );
}

// ============================================================
// RENDER REACT APPLICATION
// ============================================================

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Check index.html."
  );
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
