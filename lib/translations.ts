"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es";

export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "en", setLocale: () => {} });

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.resume": "Resume",

    // Hero
    "hero.bio": "A Software Engineering student with an interest in low-level systems and graphics engines. Currently building graphics engines from scratch in C++.",
    "hero.role": "SWE @ University of Miami",
    "hero.focus": "Systems / Graphics / Engines",

    // Capabilities section (homepage)
    "capabilities.title": "Capabilities",
    "capabilities.languages": "Languages",
    "capabilities.frameworks": "Frameworks",
    "capabilities.tools": "Tools",

    // About section (homepage)
    "about.title": "About",
    "about.bio1": "I'm a bilingual student at the University of Miami, originally from Houston, Texas. I found a real satisfaction in understanding how software controls hardware at the lowest level.",
    "about.bio2": "I'm consistently inspired by technology that is highly efficient and well thought out, and I aspire to grow my skills to build software like that myself.",
    "about.label.building": "Building",
    "about.label.studying": "Studying",
    "about.label.based": "Based in",
    "about.value.building": "3D game engine from scratch",
    "about.value.studying": "B.S. Software Engineering",
    "about.value.based": "Miami, FL",

    // Projects section (homepage)
    "projects.title": "Projects",
    "projects.engine.title": "3D Game Engine",
    "projects.engine.description": "A starting point for 3D physics-based games. Designed to give developers the essential tools to build complete 3D games in C++ using raylib.",
    "projects.platformer.title": "2D Platformer",
    "projects.platformer.description": "A personal 2D platformer built entirely from scratch in C++. Currently incomplete, but includes an animation controller, parallax backgrounds, pixel-perfect graphics, and a custom physics system.",
    "projects.ensel.title": "Ensel Technologies",
    "projects.ensel.description": "A complete website redesign I built during my internship. This project taught me web development, hosting, and SEO, and the result outperformed the company's previous site.",
    "projects.status.inProgress": "In Progress",
    "projects.status.incomplete": "Incomplete",
    "projects.status.complete": "Complete",

    "projects.allProjects": "All projects →",

    // Blog section (homepage + blog page)
    "blog.title": "Blog",
    "blog.allPosts": "All posts →",
    "blog.subtitle": "Thoughts on systems, graphics, and building things.",

    // Resume section (homepage)
    "resume.title": "Resume",
    "resume.education": "Education",
    "resume.education.value": "B.S. Software Engineering, University of Miami — Expected May 2028",
    "resume.experience": "Experience",
    "resume.experience.value": "Engineering Intern at Ensel Technologies LLC (2024–2025)",
    "resume.awards": "Awards",
    "resume.awards.value": "Canes Achievement Award · Barry M. Moran Mathematics Award",
    "resume.fullResume": "Full Resume →",

    // About page
    "aboutPage.title": "About",
    "aboutPage.bio1": "I'm a bilingual student at the University of Miami, originally from Houston, Texas. I found a real satisfaction in understanding how software controls hardware at the lowest level.",
    "aboutPage.bio2": "I'm consistently inspired by technology that is highly efficient and well thought out, and I aspire to grow my skills to build software like that myself.",
    "aboutPage.currently": "Currently",
    "aboutPage.building.label": "Building",
    "aboutPage.building.value": "A 3D game engine from scratch — the foundation for a game I'm designing.",
    "aboutPage.studying.label": "Studying",
    "aboutPage.studying.value": "B.S. Software Engineering, University of Miami",
    "aboutPage.based.label": "Based in",
    "aboutPage.based.value": "Miami, FL (from Houston, TX)",

    // Projects page
    "projectsPage.title": "Projects",
    "projectsPage.subtitle": "Things I've built or am currently building.",
    "projectsPage.engine.title": "3D Game Engine",
    "projectsPage.engine.description": "A starting point for 3D physics-based games. Designed to give developers the essential tools to build complete 3D games in C++ using raylib.",
    "projectsPage.platformer.title": "2D Platformer",
    "projectsPage.platformer.description": "A personal 2D platformer built entirely from scratch in C++. Currently incomplete, but includes an animation controller, parallax backgrounds, pixel-perfect graphics, and a custom physics system.",
    "projectsPage.ensel.title": "Ensel Technologies",
    "projectsPage.ensel.description": "A complete website redesign I built during my internship. This project taught me web development, hosting, and SEO, and the result outperformed the company's previous site.",

    // Resume page
    "resumePage.subtitle": "Software Engineering Student",
    "resumePage.education": "Education",
    "resumePage.experience": "Experience",
    "resumePage.projects": "Projects",
    "resumePage.skills": "Skills",
    "resumePage.coursework": "Coursework",
    "resumePage.awards": "Awards",
    "resumePage.edu.degree": "B.S. Software Engineering",
    "resumePage.edu.date": "Expected May 2028",
    "resumePage.edu.note": "Canes Achievement Award — $12,000/year merit scholarship",
    "resumePage.exp1.title": "Summer Engineering Intern",
    "resumePage.exp1.date": "May 2024 – July 2025",
    "resumePage.exp1.bullet1": "Assisted engineers in monitoring and maintaining factory production systems and machinery operations.",
    "resumePage.exp2.title": "President & Lead Analyst",
    "resumePage.exp2.date": "Sept 2022 – May 2023",
    "resumePage.exp2.bullet1": "Led a team of student researchers analyzing equities for a $150,000 investment portfolio.",
    "resumePage.exp2.bullet2": "Presented investment recommendations to the board of trustees alongside the CFO.",
    "resumePage.proj1.title": "3D Game Engine",
    "resumePage.proj1.bullet1": "Building a custom 3D engine from scratch as the foundation for an original game.",
    "resumePage.proj1.bullet2": "Handles rendering, scene management, and core engine architecture.",
    "resumePage.proj2.title": "2D Platformer",
    "resumePage.proj2.bullet1": "Built a custom 2D platformer with hand-rolled collision detection, camera systems, enemy AI, and player movement.",
    "resumePage.proj2.bullet2": "Structured with OOP principles, header files, and Makefiles. Version controlled with Git.",
    "resumePage.award1.title": "Canes Achievement Award",
    "resumePage.award1.date": "June 2024",
    "resumePage.award1.detail": "$12,000/year for four years. Maintained 3.0 GPA with full-time course load.",
    "resumePage.award2.title": "Barry M. Moran Mathematics Award",
    "resumePage.award2.date": "May 2024",
    "resumePage.award2.detail": "Top of class in Mathematics for the 2023–2024 school year.",
  },
  es: {
    // Nav
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.resume": "Currículum",

    // Hero
    "hero.bio": "Estudiante de Ingeniería de Software con interés en sistemas de bajo nivel y motores gráficos. Actualmente construyendo motores gráficos desde cero en C++.",
    "hero.role": "Ing. de Software @ University of Miami",
    "hero.focus": "Sistemas / Gráficos / Motores",

    // Capabilities section (homepage)
    "capabilities.title": "Habilidades",
    "capabilities.languages": "Lenguajes",
    "capabilities.frameworks": "Frameworks",
    "capabilities.tools": "Herramientas",

    // About section (homepage)
    "about.title": "Sobre mí",
    "about.bio1": "Soy un estudiante bilingüe en la University of Miami, originario de Houston, Texas. Encontré una verdadera satisfacción en entender cómo el software controla el hardware al nivel más bajo.",
    "about.bio2": "Me inspira constantemente la tecnología que es altamente eficiente y bien pensada, y aspiro a desarrollar mis habilidades para construir software así yo mismo.",
    "about.label.building": "Creando",
    "about.label.studying": "Estudiando",
    "about.label.based": "Ubicación",
    "about.value.building": "Motor de juegos 3D desde cero",
    "about.value.studying": "B.S. Ingeniería de Software",
    "about.value.based": "Miami, FL",

    // Projects section (homepage)
    "projects.title": "Proyectos",
    "projects.engine.title": "Motor de Juegos 3D",
    "projects.engine.description": "Un punto de partida para juegos 3D basados en física. Diseñado para dar a los desarrolladores las herramientas esenciales para construir juegos 3D completos en C++ usando raylib.",
    "projects.platformer.title": "Plataformas 2D",
    "projects.platformer.description": "Un juego de plataformas 2D personal, construido completamente desde cero en C++. Actualmente incompleto, pero incluye un controlador de animaciones, fondos con parallax, gráficos pixel-perfect y un sistema de físicas propio.",
    "projects.ensel.title": "Ensel Technologies",
    "projects.ensel.description": "Un rediseño completo del sitio web que construí durante mi pasantía. Este proyecto me enseñó desarrollo web, hosting y SEO, y el resultado superó al sitio anterior de la empresa.",
    "projects.status.inProgress": "En progreso",
    "projects.status.incomplete": "Incompleto",
    "projects.status.complete": "Completo",

    "projects.allProjects": "Todos los proyectos →",

    // Blog section (homepage + blog page)
    "blog.title": "Blog",
    "blog.allPosts": "Todos los posts →",
    "blog.subtitle": "Reflexiones sobre sistemas, gráficos y construir cosas.",

    // Resume section (homepage)
    "resume.title": "Currículum",
    "resume.education": "Educación",
    "resume.education.value": "B.S. Ingeniería de Software, University of Miami — Esperado mayo 2028",
    "resume.experience": "Experiencia",
    "resume.experience.value": "Pasante de Ingeniería en Ensel Technologies LLC (2024–2025)",
    "resume.awards": "Premios",
    "resume.awards.value": "Canes Achievement Award · Barry M. Moran Mathematics Award",
    "resume.fullResume": "Currículum completo →",

    // About page
    "aboutPage.title": "Sobre mí",
    "aboutPage.bio1": "Soy un estudiante bilingüe en la University of Miami, originario de Houston, Texas. Encontré una verdadera satisfacción en entender cómo el software controla el hardware al nivel más bajo.",
    "aboutPage.bio2": "Me inspira constantemente la tecnología que es altamente eficiente y bien pensada, y aspiro a desarrollar mis habilidades para construir software así yo mismo.",
    "aboutPage.currently": "Actualmente",
    "aboutPage.building.label": "Creando",
    "aboutPage.building.value": "Un motor de juegos 3D desde cero — la base de un juego que estoy diseñando.",
    "aboutPage.studying.label": "Estudiando",
    "aboutPage.studying.value": "B.S. Ingeniería de Software, University of Miami",
    "aboutPage.based.label": "Ubicación",
    "aboutPage.based.value": "Miami, FL (de Houston, TX)",

    // Projects page
    "projectsPage.title": "Proyectos",
    "projectsPage.subtitle": "Cosas que he construido o estoy construyendo actualmente.",
    "projectsPage.engine.title": "Motor de Juegos 3D",
    "projectsPage.engine.description": "Un punto de partida para juegos 3D basados en física. Diseñado para dar a los desarrolladores las herramientas esenciales para construir juegos 3D completos en C++ usando raylib.",
    "projectsPage.platformer.title": "Plataformas 2D",
    "projectsPage.platformer.description": "Un juego de plataformas 2D personal, construido completamente desde cero en C++. Actualmente incompleto, pero incluye un controlador de animaciones, fondos con parallax, gráficos pixel-perfect y un sistema de físicas propio.",
    "projectsPage.ensel.title": "Ensel Technologies",
    "projectsPage.ensel.description": "Un rediseño completo del sitio web que construí durante mi pasantía. Este proyecto me enseñó desarrollo web, hosting y SEO, y el resultado superó al sitio anterior de la empresa.",

    // Resume page
    "resumePage.subtitle": "Estudiante de Ingeniería de Software",
    "resumePage.education": "Educación",
    "resumePage.experience": "Experiencia",
    "resumePage.projects": "Proyectos",
    "resumePage.skills": "Habilidades",
    "resumePage.coursework": "Cursos",
    "resumePage.awards": "Premios",
    "resumePage.edu.degree": "B.S. Ingeniería de Software",
    "resumePage.edu.date": "Esperado mayo 2028",
    "resumePage.edu.note": "Canes Achievement Award — beca de mérito de $12,000/año",
    "resumePage.exp1.title": "Pasante de Ingeniería de Verano",
    "resumePage.exp1.date": "Mayo 2024 – Julio 2025",
    "resumePage.exp1.bullet1": "Asistí a ingenieros en el monitoreo y mantenimiento de sistemas de producción y operaciones de maquinaria en fábrica.",
    "resumePage.exp2.title": "Presidente y Analista Principal",
    "resumePage.exp2.date": "Sept 2022 – Mayo 2023",
    "resumePage.exp2.bullet1": "Lideré un equipo de estudiantes investigadores analizando acciones para un portafolio de inversión de $150,000.",
    "resumePage.exp2.bullet2": "Presenté recomendaciones de inversión a la junta directiva junto al director financiero.",
    "resumePage.proj1.title": "Motor de Juegos 3D",
    "resumePage.proj1.bullet1": "Construyendo un motor 3D personalizado desde cero como base para un juego original.",
    "resumePage.proj1.bullet2": "Maneja renderizado, gestión de escenas y arquitectura central del motor.",
    "resumePage.proj2.title": "Plataformas 2D",
    "resumePage.proj2.bullet1": "Construí un juego de plataformas 2D con detección de colisiones, sistemas de cámara, IA de enemigos y movimiento del jugador hechos a mano.",
    "resumePage.proj2.bullet2": "Estructurado con principios de POO, archivos de cabecera y Makefiles. Control de versiones con Git.",
    "resumePage.award1.title": "Canes Achievement Award",
    "resumePage.award1.date": "Junio 2024",
    "resumePage.award1.detail": "$12,000/año por cuatro años. GPA de 3.0 mantenido con carga completa de cursos.",
    "resumePage.award2.title": "Barry M. Moran Mathematics Award",
    "resumePage.award2.date": "Mayo 2024",
    "resumePage.award2.detail": "Primero de la clase en Matemáticas del año escolar 2023–2024.",
  },
};

export function useTranslation() {
  const { locale, setLocale } = useContext(LanguageContext);
  const t = (key: string): string => translations[locale][key] ?? key;
  return { t, locale, setLocale };
}
