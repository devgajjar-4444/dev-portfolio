"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript"],
  },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "Go"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    category: "Tools",
    items: ["Git/GitHub", "Docker", "AWS"],
  },
]

const projects = [
  {
    name: "FlikForge",
    description: "AI platform for training custom LLMs with intuitive interfaces and powerful ML capabilities",
    detailedDescription:
      "FlikForge enables users to train custom LLMs and generate AI-powered content such as images and videos. Users can monetize their creations by selling AI-generated content or sharing trained LLMs with others.",
    tech: ["NestJS", "Python", "Next.js"],
    link: "https://flikforge.com/",
    responsibilities: [
      "Led backend architecture and API development using NestJS",
      "Integrated third-party AI services for model training and inference",
      "Collaborated with Python team on LLM training workflows",
      "Led a team of four developers with daily client calls",
    ],
  },
  {
    name: "Acadenutri",
    description: "Health and fitness platform connecting users with certified nutritionists and gym trainers",
    detailedDescription:
      "Acadenutri is a comprehensive health platform with mobile and web apps supporting four user types: Admin, General Users, Nutritionists, and Gym Trainers. Trainers and Nutritionists subscribe and earn commission on user payments.",
    tech: ["Node.js", "Flutter", "Python"],
    link: "https://acadenutri.com.br/home",
    responsibilities: [
      "Developed backend services using Node.js",
      "Managed communication with client for task requirements",
      "Coordinated development efforts across in-house and freelance teams",
      "Distributed tasks and maintained project timelines",
    ],
  },
  {
    name: "Elite Pickleball Coaching",
    description: "Comprehensive athlete training platform with real-time coach-athlete interactions",
    detailedDescription:
      "EPC is a web and mobile platform for athletes wanting to train professionally with certified coaches. Features separate applications for coaches and athletes, plus admin panel. Enables real-time interactions with workout assignments and video reviews.",
    tech: ["Next.js", "MySQL", "React Native"],
    link: "https://elitepickleballcoaching.com/",
    links: {
      admin: "https://admin.elitepickleballcoaching.com/",
      athlete: "https://athlete.elitepickleballcoaching.com/",
      coach: "https://coach.elitepickleballcoaching.com/",
    },
    responsibilities: [
      "Full-stack development for large-scale platform with multi-user roles",
      "Served as Point of Contact (POC) with daily client interactions",
      "Implemented quality assurance and bug resolution",
      "Managed live production environment with real user base",
    ],
  },
  {
    name: "Unify",
    description: "Cab booking platform enabling ride reservations across London",
    detailedDescription:
      "Full-stack cab booking system with separate mobile applications for users and drivers, plus comprehensive admin panel for management and verification. Built with modern tech stack for scalability.",
    tech: ["Node.js", "Next.js", "MySQL"],
    link: "#",
    responsibilities: [
      "Full stack development from frontend to backend",
      "Client communication for complex requirements",
      "Ensured successful, client-focused outcomes",
      "Implemented user and driver applications with admin management",
    ],
  },
  {
    name: "AI Chat Platform",
    description: "Real-time messaging with AI-powered suggestions and intelligent insights",
    tech: ["Next.js", "WebSocket", "OpenAI"],
    link: "#",
  },
  {
    name: "FinTech Dashboard",
    description: "Advanced analytics dashboard for cryptocurrency trading and portfolio management",
    tech: ["React", "TradingView", "Node.js"],
    link: "#",
  },
  {
    name: "Task Management Pro",
    description: "Collaborative task management with real-time updates and team coordination",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    link: "#",
  },
  {
    name: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with payment processing and inventory management",
    tech: ["Next.js", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    name: "Social Network",
    description: "Community-driven social platform with feed, messaging, and content discovery",
    tech: ["React Native", "Firebase", "GraphQL"],
    link: "#",
  },
]

const experience = [
  {
    company: "InteliVitas",
    role: "Software Engineer",
    period: "Sep 2025 – Present",
    description: "Building scalable solutions",
  },
  {
    company: "InheritX",
    role: "Software Engineer (Backend Lead)",
    period: "Mar 2023 – Aug 2025",
    description: "Led backend architecture and team",
  },
  {
    company: "Double Dotts",
    role: "Software Engineer",
    period: "Oct 2022 – Mar 2023",
    description: "Full-stack development",
  },
]

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([0, 0, 0])
  const [activeSection, setActiveSection] = useState("")
  const [projectParallax, setProjectParallax] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const experienceSectionRef = useRef<HTMLDivElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const workSection = document.getElementById("work")
      const skillsSection = document.getElementById("skills")
      const contactSection = document.getElementById("contact")

      if (contactSection && window.scrollY >= contactSection.offsetTop - 100) {
        setActiveSection("contact")
      } else if (workSection && window.scrollY >= workSection.offsetTop - 100) {
        setActiveSection("work")
      } else if (skillsSection && window.scrollY >= skillsSection.offsetTop - 100) {
        setActiveSection("skills")
      } else {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!experienceSectionRef.current) return

      const sectionTop = experienceSectionRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight && sectionTop > -400) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + 400)
        const newOffsets = [scrollProgress * 40, scrollProgress * 60, scrollProgress * 80]
        setParallaxOffsets(newOffsets)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsSectionRef.current) return

      const sectionTop = projectsSectionRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight && sectionTop > -400) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + 400)
        setProjectParallax(scrollProgress * 30)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentProjectIndex((prev) => {
          const newIndex = (prev + 1) % totalProjects
          // When we reach the end, prepare for smooth loop
          if (newIndex === 0) {
            setIsTransitioning(true)
            setTimeout(() => setIsTransitioning(false), 50)
          }
          return newIndex
        })
      }, 5000) // Auto-scroll every 5 seconds
    }

    startAutoScroll()

    return () => {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current)
    }
  }, [])

  const totalProjects = projects.length
  const currentProject = projects[currentProjectIndex]
  const nextProjectIndex = (currentProjectIndex + 1) % totalProjects
  
  // Create a circular array for infinite scrolling
  const displayProjects = [...projects, ...projects.slice(0, 2)] // Add first 2 projects for smooth loop

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-lg font-bold hover:text-accent transition-colors">
            Dev Gajjar
          </a>
          <div className="flex gap-8">
            <a
              href="#work"
              className={`text-sm font-medium transition-colors ${
                activeSection === "work" ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Work
            </a>
            <a
              href="#skills"
              className={`text-sm font-medium transition-colors ${
                activeSection === "skills" ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Skills
            </a>
            <a
              href="#contact"
              className={`text-sm font-medium transition-colors ${
                activeSection === "contact"
                  ? "text-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-background border-x-2 border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <section className="mb-28">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance leading-tight">Full Stack Engineer</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              I build fast, scalable applications with Node.js, React, and Go. Over 3 years helping fintech, AI, and
              healthcare companies solve complex problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center px-6 py-3 border border-border font-semibold rounded-lg hover:bg-card transition-colors"
              >
                View My Work
              </a>
            </div>
          </section>

          <section id="skills" className="mb-28">
            <h2 className="text-3xl font-bold mb-12">Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-4">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section ref={experienceSectionRef} className="mb-28">
            <h2 className="text-3xl font-bold mb-12">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    transform: `translateY(${parallaxOffsets[idx] || 0}px)`,
                    opacity: 0.8 + (parallaxOffsets[idx] || 0) / 100,
                  }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors group cursor-pointer will-change-transform"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">{exp.role}</p>
                    </div>
                    <span className="text-xs font-medium bg-secondary text-foreground px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="work" ref={projectsSectionRef} className="mb-28">
            <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

            <div className="relative w-full overflow-hidden">
              <div className="w-full overflow-hidden rounded-xl">
                <div
                  className={`flex ${isTransitioning ? 'transition-none' : 'transition-transform duration-700 ease-out'}`}
                  style={{
                    transform: `translateX(calc(-${currentProjectIndex * 80}%))`,
                  }}
                >
                  {displayProjects.map((project, idx) => {
                    const transformValue = `translateY(${projectParallax * 0.5}px)`
                    return (
                    <div
                      key={`${project.name}-${idx}`}
                      className="flex-shrink-0"
                      style={{
                        width: "80%",
                        paddingRight: "20px",
                      }}
                    >
                      <div
                        onClick={() => {
                          if (project.link && project.link !== "#") {
                            window.open(project.link, "_blank")
                          }
                        }}
                        className={`group bg-card rounded-xl p-8 ${
                          idx % totalProjects === currentProjectIndex
                            ? "border-2 border-accent shadow-xl shadow-accent/20 relative overflow-hidden"
                            : project.link && project.link !== "#"
                              ? "border-2 border-border hover:border-accent hover:shadow-lg hover:shadow-accent/10 cursor-pointer shadow-md shadow-black/5 relative overflow-hidden"
                              : "border-2 border-border shadow-md shadow-black/5"
                        } border-b-4 transition-all duration-300 flex flex-col relative`}
                        style={{
                          background: idx % totalProjects === currentProjectIndex 
                            ? 'linear-gradient(to top, rgb(var(--accent) / 0.1), transparent), rgb(var(--card))'
                            : project.link && project.link !== "#"
                              ? 'linear-gradient(to top, rgb(var(--accent) / 0.05), transparent), rgb(var(--card))'
                              : 'rgb(var(--card))',
                          borderImage: idx % totalProjects === currentProjectIndex
                            ? 'linear-gradient(to top, rgb(var(--accent)), transparent) 1'
                            : project.link && project.link !== "#"
                              ? 'linear-gradient(to top, rgb(var(--accent) / 0.5), transparent) 1'
                              : 'none',
                          transform: transformValue,
                          height: "auto",
                          minHeight: "600px",
                        }}
                        onMouseEnter={(e) => {
                          if (project.link && project.link !== "#" && idx % totalProjects !== currentProjectIndex) {
                            e.currentTarget.style.borderImage = 'linear-gradient(to top, rgb(var(--accent)), transparent) 1'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (project.link && project.link !== "#" && idx % totalProjects !== currentProjectIndex) {
                            e.currentTarget.style.borderImage = 'none'
                          }
                        }}
                        role={project.link && project.link !== "#" ? "button" : undefined}
                        tabIndex={project.link && project.link !== "#" ? 0 : undefined}
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && project.link && project.link !== "#") {
                            window.open(project.link, "_blank")
                          }
                        }}
                      >
                        <div className="relative z-10">
                          <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors flex items-center gap-2 line-clamp-2">
                            {project.name}
                            {project.link && project.link !== "#" && (
                              <ExternalLink
                                size={20}
                                className="opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              />
                            )}
                          </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                        {project.detailedDescription && (
                          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            {project.detailedDescription}
                          </p>
                        )}

                        {project.responsibilities && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Key Responsibilities:</p>
                            <ul className="space-y-1">
                              {project.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mb-3">
                          <p className="text-sm font-semibold text-foreground mb-2">Tech Stack:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span key={t} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.links && (
                          <div className="pt-3">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Visit Platform</p>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(project.links).map(([key, url]) => (
                                <a
                                  key={key}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 hover:bg-accent/20 text-accent text-xs rounded transition-colors"
                                >
                                  <ExternalLink size={12} />
                                  <span className="capitalize">{key}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentProjectIndex(idx)
                      setIsTransitioning(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentProjectIndex
                        ? "bg-accent w-8"
                        : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="border-t border-border pt-20 pb-12">
            <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Interested in collaborating? Feel free to reach out. I'm always open to discussing new projects and
              opportunities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="mailto:devgajjar0132@gmail.com"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent hover:bg-card/50 transition-all group"
              >
                <Mail size={28} className="text-accent group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold group-hover:text-accent transition-colors">Send me a message</p>
                </div>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent hover:bg-card/50 transition-all group"
              >
                <Github size={28} className="text-accent group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-semibold group-hover:text-accent transition-colors">Check my code</p>
                </div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent hover:bg-card/50 transition-all group"
              >
                <Linkedin size={28} className="text-accent group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-semibold group-hover:text-accent transition-colors">Connect with me</p>
                </div>
              </a>
            </div>
          </section>

          <footer className="border-t border-border pt-12 text-center text-muted-foreground text-sm">
            <p>© 2025 Dev Gajjar. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
