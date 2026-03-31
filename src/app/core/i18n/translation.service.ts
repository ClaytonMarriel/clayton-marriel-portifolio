import { Injectable, computed, signal } from '@angular/core';

export type LanguageCode = 'pt-BR' | 'en' | 'es';

interface LanguageOption {
  code: LanguageCode;
  label: string;
}

type TranslationValue = string | Translations;
interface Translations {
  [key: string]: TranslationValue;
}

const STORAGE_KEY = 'portfolio.language';

const translations: Record<LanguageCode, Translations> = {
  'pt-BR': {
    navbar: {
      role: 'Senior Frontend Engineer',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      stack: 'Stack',
      contact: 'Contato',
      cta: 'Vamos conversar',
      languageLabel: 'Idioma',
    },
    hero: {
      greeting: 'Olá, eu sou',
      role: 'Senior Frontend Engineer',
      description:
        'Desenvolvo aplicações corporativas escaláveis com Angular, React e TypeScript, com foco em arquitetura, performance, integração com APIs e experiência do usuário.',
      cta: 'Ver meus projetos',
      imageAlt: 'Ilustração principal do portfólio',
      bannerTitle: 'Resumo profissional',
      bannerDescription: '5+ anos criando produtos digitais escaláveis para clientes enterprise e projetos de alta complexidade.',
      bannerCta: 'Ver trajetória',
      profileAlt: 'Foto de perfil',
    },
    about: {
      kicker: 'Sobre mim',
      titleLine1: 'Engenheiro Frontend construindo',
      titleHighlight: 'produtos digitais escaláveis',
      typing1: 'Olá, eu sou Clayton Marriel.',
      typing2: 'Senior Frontend Engineer com foco em Angular, React e TypeScript.',
      typing3:
        'Experiência com aplicações corporativas, microfrontends e arquitetura escalável.',
      typing4:
        'Também evoluindo em C#, backend e mercado internacional.',
      description:
        'Atuo no desenvolvimento e evolução de aplicações corporativas com foco em Angular, TypeScript e React, incluindo componentização, integração com APIs, fluxos de negócio complexos, manutenção evolutiva, arquitetura escalável, testes unitários e padrões de projeto.',
      projectsCta: 'Explorar projetos',
      contactCta: 'Entrar em contato',
      cards: {
        experience: {
          label: 'Experiência',
          title: '5+ anos',
          description:
            'Atuando com desenvolvimento web, interfaces modernas e aplicações corporativas.',
        },
        focus: {
          label: 'Foco',
          title: 'Angular + UI',
          description:
            'Forte atuação com Angular, TypeScript, componentização, arquitetura e UX.',
        },
        architecture: {
          label: 'Arquitetura',
          title: 'Microfrontends',
          description:
            'Experiência com Native Federation, módulos escaláveis e múltiplos fluxos.',
        },
        growth: {
          label: 'Evolução',
          title: 'Frontend → Full Stack',
          description:
            'Evoluindo em C#, APIs REST, backend e preparação para oportunidades internacionais.',
        },
      },
    },
    experience: {
      kicker: 'Experiência',
      title: 'Minha experiência profissional',
      description:
        'Projetos, entregas e contexto de atuação em desenvolvimento frontend, arquitetura e aplicações corporativas.',
      current: {
        period: 'Atual',
        title: 'Senior Frontend Engineer',
        subtitle: 'Projetos corporativos / aplicações enterprise',
        description:
          'Experiência no desenvolvimento e evolução de aplicações corporativas com foco em Angular, TypeScript e React, incluindo componentização, integração com APIs, fluxos de negócio complexos, manutenção evolutiva, arquitetura escalável, testes unitários e aplicação de padrões de projeto.',
      },
      architecture: {
        period: 'Projetos recentes',
        title: 'Arquitetura Frontend e Microfrontends',
        subtitle: 'Escalabilidade e organização de módulos',
        description:
          'Participação em cenários com microfrontends, Native Federation, modularização, padronização de estrutura e adaptação de aplicações para arquiteturas mais escaláveis e sustentáveis.',
      },
      backend: {
        period: 'Evolução técnica',
        title: 'Estudos em Backend e APIs',
        subtitle: 'C# / ASP.NET Core',
        description:
          'Desenvolvimento de projetos de estudo e fortalecimento técnico em backend com C#, ASP.NET Core, Entity Framework, autenticação, API REST e boas práticas de organização.',
      },
      tags: {
        architecture: 'Arquitetura',
      },
    },
    projects: {
      kicker: 'Projetos',
      title: 'Projetos corporativos em destaque',
      description:
        'Projetos desenvolvidos em empresas e clientes nos quais atuei, com foco em contexto de negócio, impacto real, tecnologias utilizadas e práticas de engenharia.',
      showMore: 'Ver mais',
      cards: {
        enterprise: {
          badge: 'Enterprise',
          title: 'Plataforma Frontend Corporativa',
          description:
            'Aplicação corporativa com Angular, múltiplos fluxos, integrações com APIs e foco em arquitetura escalável.',
          cta: 'Ver detalhes',
        },
        mfe: {
          badge: 'Arquitetura',
          title: 'Arquitetura de Microfrontends',
          description:
            'Estrutura modular com Native Federation, organização de remotes e foco em escalabilidade de aplicações.',
          cta: 'Ver detalhes',
        },
        api: {
          badge: 'Backend',
          title: 'ProductHub API',
          description:
            'API REST desenvolvida com C# e ASP.NET Core para praticar arquitetura, autenticação e boas práticas de backend.',
        },
        portfolio: {
          badge: 'Portfólio',
          title: 'Portfólio Pessoal',
          description:
            'Portfólio single page com Angular, visual premium, seções autorais e foco em apresentação profissional.',
          cta: 'Ver projeto',
        },
      },
    },
    stack: {
      kicker: 'Minha stack',
      title: 'Tecnologias com as quais trabalho',
      description:
        'Tecnologias que uso para construir interfaces modernas, aplicações escaláveis e soluções com foco em performance e experiência do usuário.',
      frontend: {
        title: 'Frontend',
        description: 'Interfaces modernas e escaláveis',
      },
      backend: {
        title: 'Backend',
        description: 'APIs e lógica de negócio',
      },
      architecture: {
        title: 'Arquitetura',
        description: 'Organização e escalabilidade',
        componentization: 'Componentização',
      },
      tools: {
        title: 'Ferramentas e fluxo',
        description: 'Entrega, versionamento e produtividade',
      },
      stripTitle: 'Tecnologias principais',
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos nos conectar?',
      description:
        'Estou aberto a oportunidades, conexões profissionais e projetos que envolvam frontend, arquitetura e evolução de produto.',
      linkedin: 'linkedin.com/in/claytonmarriel',
      github: 'Ver repositórios e projetos',
      whatsapp: '+55 22 99103-5728',
      cta: 'Entrar em contato',
    },
    footer: {
      role: 'Senior Frontend Engineer • Angular • React • TypeScript',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      stack: 'Stack',
      contact: 'Contato',
      rights: 'Todos os direitos reservados.',
      builtWith: 'Construído com Angular, SCSS e Tailwind.',
    },
  },
  en: {
    navbar: {
      role: 'Senior Frontend Engineer',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
      cta: 'Let’s Talk',
      languageLabel: 'Language',
    },
    hero: {
      greeting: 'Hi, I’m',
      role: 'Senior Frontend Engineer',
      description:
        'I build scalable enterprise applications with Angular, React and TypeScript, focusing on architecture, API integration, performance and user experience.',
      cta: 'View My Work',
      imageAlt: 'Main portfolio illustration',
      bannerTitle: 'Professional Summary',
      bannerDescription: '5+ years building scalable digital products for enterprise clients and high-complexity projects.',
      bannerCta: 'View Journey',
      profileAlt: 'Profile photo',
    },
    about: {
      kicker: 'About Me',
      titleLine1: 'Frontend Engineer building',
      titleHighlight: 'scalable digital products',
      typing1: 'Hi, I’m Clayton Marriel.',
      typing2: 'Senior Frontend Engineer focused on Angular, React and TypeScript.',
      typing3:
        'Experience with enterprise applications, microfrontends and scalable architecture.',
      typing4:
        'Also growing in C#, backend development and the international market.',
      description:
        'Experience in the development and evolution of enterprise applications focused on Angular, TypeScript and React, including component-based architecture, API integration, complex business flows, continuous maintenance, scalable architecture, unit testing and design patterns.',
      projectsCta: 'Explore Projects',
      contactCta: 'Get in Touch',
      cards: {
        experience: {
          label: 'Experience',
          title: '5+ years',
          description:
            'Working with web development, modern interfaces and enterprise applications.',
        },
        focus: {
          label: 'Focus',
          title: 'Angular + UI',
          description:
            'Strong background in Angular, TypeScript, componentization, architecture and UX.',
        },
        architecture: {
          label: 'Architecture',
          title: 'Microfrontends',
          description:
            'Experience with Native Federation, scalable modules and multiple business flows.',
        },
        growth: {
          label: 'Growth',
          title: 'Frontend → Full Stack',
          description:
            'Growing in C#, REST APIs, backend development and preparation for international opportunities.',
        },
      },
    },
    experience: {
      kicker: 'Experience',
      title: 'My professional experience',
      description:
        'Projects, deliveries and professional context in frontend development, architecture and enterprise applications.',
      current: {
        period: 'Current',
        title: 'Senior Frontend Engineer',
        subtitle: 'Corporate projects / enterprise applications',
        description:
          'Experience in the development and evolution of enterprise applications focused on Angular, TypeScript, and React, including component-based architecture, API integration, complex business flows, continuous maintenance, scalable architecture, unit testing, and the application of design patterns.',
      },
      architecture: {
        period: 'Recent projects',
        title: 'Frontend Architecture and Microfrontends',
        subtitle: 'Scalability and module organization',
        description:
          'Experience in microfrontend scenarios, Native Federation, modularization, structural standardization and adaptation of applications to more scalable and sustainable architectures.',
      },
      backend: {
        period: 'Technical growth',
        title: 'Backend Studies & APIs',
        subtitle: 'C# / ASP.NET Core',
        description:
          'Building study projects and strengthening backend skills with C#, ASP.NET Core, Entity Framework, authentication, REST APIs and organizational best practices.',
      },
      tags: {
        architecture: 'Architecture',
      },
    },
    projects: {
      kicker: 'Projects',
      title: 'Featured corporate projects',
      description:
        'Projects delivered for companies and clients I worked with, focused on business context, real impact, technologies used and engineering practices.',
      showMore: 'View more',
      cards: {
        enterprise: {
          badge: 'Enterprise',
          title: 'Corporate Frontend Platform',
          description:
            'Corporate application built with Angular, multiple business flows, API integrations and a strong focus on scalable architecture.',
          cta: 'View Details',
        },
        mfe: {
          badge: 'Architecture',
          title: 'Microfrontend Architecture',
          description:
            'Modular structure with Native Federation, remote organization and focus on application scalability.',
          cta: 'View Details',
        },
        api: {
          badge: 'Backend',
          title: 'ProductHub API',
          description:
            'REST API built with C# and ASP.NET Core to practice architecture, authentication and backend best practices.',
        },
        portfolio: {
          badge: 'Portfolio',
          title: 'Personal Portfolio',
          description:
            'Single-page portfolio built with Angular, premium visuals, custom sections and a focus on professional presentation.',
          cta: 'View Project',
        },
      },
    },
    stack: {
      kicker: 'My Stack',
      title: 'Technologies I work with',
      description:
        'Technologies I use to build modern interfaces, scalable applications and solutions focused on performance and user experience.',
      frontend: {
        title: 'Frontend',
        description: 'Modern and scalable interfaces',
      },
      backend: {
        title: 'Backend',
        description: 'APIs and business logic',
      },
      architecture: {
        title: 'Architecture',
        description: 'Organization and scalability',
        componentization: 'Componentization',
      },
      tools: {
        title: 'Tools & Workflow',
        description: 'Delivery, versioning and productivity',
      },
      stripTitle: 'Core Technologies',
    },
    contact: {
      kicker: 'Contact',
      title: 'Let’s connect?',
      description:
        'I’m open to opportunities, professional connections and projects involving frontend, architecture and product evolution.',
      linkedin: 'linkedin.com/in/claytonmarriel',
      github: 'See repositories and projects',
      whatsapp: '+55 22 99103-5728',
      cta: 'Get in Touch',
    },
    footer: {
      role: 'Senior Frontend Engineer • Angular • React • TypeScript',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
      rights: 'All rights reserved.',
      builtWith: 'Built with Angular, SCSS and Tailwind.',
    },
  },
  es: {
    navbar: {
      role: 'Senior Frontend Engineer',
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      stack: 'Stack',
      contact: 'Contacto',
      cta: 'Hablemos',
      languageLabel: 'Idioma',
    },
    hero: {
      greeting: 'Hola, soy',
      role: 'Senior Frontend Engineer',
      description:
        'Desarrollo aplicaciones corporativas escalables con Angular, React y TypeScript, con foco en arquitectura, integración con APIs, rendimiento y experiencia de usuario.',
      cta: 'Ver mis proyectos',
      imageAlt: 'Ilustración principal del portafolio',
      bannerTitle: 'Resumen profesional',
      bannerDescription: 'Más de 5 años creando productos digitales escalables para clientes enterprise y proyectos de alta complejidad.',
      bannerCta: 'Ver trayectoria',
      profileAlt: 'Foto de perfil',
    },
    about: {
      kicker: 'Sobre mí',
      titleLine1: 'Ingeniero Frontend construyendo',
      titleHighlight: 'productos digitales escalables',
      typing1: 'Hola, soy Clayton Marriel.',
      typing2: 'Senior Frontend Engineer enfocado en Angular, React y TypeScript.',
      typing3:
        'Experiencia con aplicaciones corporativas, microfrontends y arquitectura escalable.',
      typing4:
        'También creciendo en C#, backend y mercado internacional.',
      description:
        'Experiencia en el desarrollo y la evolución de aplicaciones corporativas con enfoque en Angular, TypeScript y React, incluyendo componentización, integración con APIs, flujos de negocio complejos, mantenimiento evolutivo, arquitectura escalable, pruebas unitarias y patrones de diseño.',
      projectsCta: 'Explorar proyectos',
      contactCta: 'Ponerse en contacto',
      cards: {
        experience: {
          label: 'Experiencia',
          title: '5+ años',
          description:
            'Trabajando con desarrollo web, interfaces modernas y aplicaciones corporativas.',
        },
        focus: {
          label: 'Enfoque',
          title: 'Angular + UI',
          description:
            'Fuerte experiencia con Angular, TypeScript, componentización, arquitectura y UX.',
        },
        architecture: {
          label: 'Arquitectura',
          title: 'Microfrontends',
          description:
            'Experiencia con Native Federation, módulos escalables y múltiples flujos de negocio.',
        },
        growth: {
          label: 'Crecimiento',
          title: 'Frontend → Full Stack',
          description:
            'Creciendo en C#, APIs REST, backend y preparación para oportunidades internacionales.',
        },
      },
    },
    experience: {
      kicker: 'Experiencia',
      title: 'Mi experiencia profesional',
      description:
        'Proyectos, entregas y contexto profesional en desarrollo frontend, arquitectura y aplicaciones corporativas.',
      current: {
        period: 'Actual',
        title: 'Senior Frontend Engineer',
        subtitle: 'Proyectos corporativos / aplicaciones enterprise',
        description:
          'Experiencia en el desarrollo y la evolución de aplicaciones corporativas con enfoque en Angular, TypeScript y React, incluyendo componentización, integración con APIs, flujos de negocio complejos, mantenimiento evolutivo, arquitectura escalable, pruebas unitarias y aplicación de patrones de diseño.',
      },
      architecture: {
        period: 'Proyectos recientes',
        title: 'Arquitectura Frontend y Microfrontends',
        subtitle: 'Escalabilidad y organización de módulos',
        description:
          'Participación en escenarios con microfrontends, Native Federation, modularización, estandarización estructural y adaptación de aplicaciones a arquitecturas más escalables y sostenibles.',
      },
      backend: {
        period: 'Crecimiento técnico',
        title: 'Estudios de Backend y APIs',
        subtitle: 'C# / ASP.NET Core',
        description:
          'Desarrollo de proyectos de estudio y fortalecimiento técnico en backend con C#, ASP.NET Core, Entity Framework, autenticación, APIs REST y buenas prácticas de organización.',
      },
      tags: {
        architecture: 'Arquitectura',
      },
    },
    projects: {
      kicker: 'Proyectos',
      title: 'Proyectos corporativos destacados',
      description:
        'Proyectos desarrollados para empresas y clientes en los que trabajé, con foco en contexto de negocio, impacto real, tecnologías utilizadas y prácticas de ingeniería.',
      showMore: 'Ver más',
      cards: {
        enterprise: {
          badge: 'Enterprise',
          title: 'Plataforma Frontend Corporativa',
          description:
            'Aplicación corporativa con Angular, múltiples flujos de negocio, integraciones con APIs y fuerte enfoque en arquitectura escalable.',
          cta: 'Ver detalles',
        },
        mfe: {
          badge: 'Arquitectura',
          title: 'Arquitectura de Microfrontends',
          description:
            'Estructura modular con Native Federation, organización de remotes y enfoque en escalabilidad de aplicaciones.',
          cta: 'Ver detalles',
        },
        api: {
          badge: 'Backend',
          title: 'ProductHub API',
          description:
            'API REST desarrollada con C# y ASP.NET Core para practicar arquitectura, autenticación y buenas prácticas de backend.',
        },
        portfolio: {
          badge: 'Portafolio',
          title: 'Portafolio Personal',
          description:
            'Portafolio single-page con Angular, visual premium, secciones personalizadas y foco en presentación profesional.',
          cta: 'Ver proyecto',
        },
      },
    },
    stack: {
      kicker: 'Mi stack',
      title: 'Tecnologías con las que trabajo',
      description:
        'Tecnologías que uso para construir interfaces modernas, aplicaciones escalables y soluciones enfocadas en rendimiento y experiencia de usuario.',
      frontend: {
        title: 'Frontend',
        description: 'Interfaces modernas y escalables',
      },
      backend: {
        title: 'Backend',
        description: 'APIs y lógica de negocio',
      },
      architecture: {
        title: 'Arquitectura',
        description: 'Organización y escalabilidad',
        componentization: 'Componentización',
      },
      tools: {
        title: 'Herramientas y flujo',
        description: 'Entrega, versionado y productividad',
      },
      stripTitle: 'Tecnologías principales',
    },
    contact: {
      kicker: 'Contacto',
      title: 'Conectemos',
      description:
        'Estoy abierto a oportunidades, conexiones profesionales y proyectos que involucren frontend, arquitectura y evolución de producto.',
      linkedin: 'linkedin.com/in/claytonmarriel',
      github: 'Ver repositorios y proyectos',
      whatsapp: '+55 22 99103-5728',
      cta: 'Ponerse en contacto',
    },
    footer: {
      role: 'Senior Frontend Engineer • Angular • React • TypeScript',
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      stack: 'Stack',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      builtWith: 'Construido con Angular, SCSS y Tailwind.',
    },
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly languages: LanguageOption[] = [
    { code: 'pt-BR', label: 'PT-BR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  readonly currentLanguage = signal<LanguageCode>('pt-BR');
  readonly currentDictionary = computed(() => translations[this.currentLanguage()]);

  constructor() {
    const initialLanguage = this.getInitialLanguage();
    this.currentLanguage.set(initialLanguage);
    this.syncDocumentLanguage(initialLanguage);
  }

  useLanguage(language: LanguageCode): void {
    this.currentLanguage.set(language);
    this.syncDocumentLanguage(language);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }

  translate(key: string): string {
    const language = this.currentLanguage();
    return this.resolveKey(translations[language], key) ?? this.resolveKey(translations['en'], key) ?? key;
  }

  private getInitialLanguage(): LanguageCode {
    if (typeof window === 'undefined') {
      return 'pt-BR';
    }

    const savedLanguage = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (savedLanguage && this.isSupportedLanguage(savedLanguage)) {
      return savedLanguage;
    }

    const browserLanguage = window.navigator.language as LanguageCode;

    if (browserLanguage.startsWith('pt')) {
      return 'pt-BR';
    }

    if (browserLanguage.startsWith('es')) {
      return 'es';
    }

    return 'en';
  }

  private isSupportedLanguage(language: string): language is LanguageCode {
    return language === 'pt-BR' || language === 'en' || language === 'es';
  }

  private syncDocumentLanguage(language: LanguageCode): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }

  private resolveKey(dictionary: Translations, key: string): string | null {
    const result = key.split('.').reduce<TranslationValue | undefined>((accumulator, currentKey) => {
      if (!accumulator || typeof accumulator === 'string') {
        return undefined;
      }

      return accumulator[currentKey];
    }, dictionary);

    return typeof result === 'string' ? result : null;
  }
}
