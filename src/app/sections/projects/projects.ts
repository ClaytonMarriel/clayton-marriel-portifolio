import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LanguageCode, TranslationService } from '../../core/i18n/translation.service';

interface ProjectCard {
  badge: string;
  company: string;
  client: string;
  role: string;
  description: string;
  stack: string[];
  highlights: string[];
}

const projectCards: Record<LanguageCode, ProjectCard[]> = {
  'pt-BR': [
    {
      badge: 'Globalweb',
      company: 'Globalweb',
      client: 'BB Assets',
      role: 'Frontend Angular',
      description:
        'Atuação em projetos corporativos para a BB Assets, desenvolvendo e evoluindo aplicações frontend com foco em escalabilidade, padronização visual, componentização e manutenção contínua em ambiente enterprise.',
      stack: ['Angular', 'TypeScript', 'Microfrontends', 'Testes unitários', 'Azure DevOps', 'CI/CD'],
      highlights: ['Design System', 'Boas práticas', 'Arquitetura modular'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Caterpillar',
      role: 'Frontend Angular',
      description:
        'Desenvolvimento de aplicação corporativa com Angular, participando da implementação de telas interativas, autenticação, testes unitários e integração com fluxos de CI/CD para uma entrega moderna, confiável e preparada para evolução contínua.',
      stack: ['Angular', 'TypeScript', 'Testes unitários', 'CI/CD', 'Azure DevOps', 'Autenticação'],
      highlights: ['Qualidade de código', 'Boas práticas', 'Entrega contínua'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Ecopetrol',
      role: 'Frontend React • Projeto internacional',
      description:
        'Primeira experiência internacional, atuando em uma aplicação web voltada para IoT com cadastro e gerenciamento de equipamentos, acompanhamento de funcionamento, identificação de falhas e importação/exportação de arquivos CSV.',
      stack: ['React', 'JavaScript', 'IoT', 'CSV Import/Export', 'Azure DevOps', 'Git'],
      highlights: ['Experiência internacional', 'Gestão de equipamentos', 'Relatórios operacionais'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Comgás',
      role: 'Frontend Angular',
      description:
        'Modernização de uma aplicação legada em Angular, incluindo atualização de versão do framework e continuidade do desenvolvimento de uma plataforma focada em cadastro e gestão de equipamentos, autenticação de usuário e relatórios integrados ao Power BI.',
      stack: ['Angular', 'TypeScript', 'Power BI', 'Autenticação', 'Azure DevOps', 'Git'],
      highlights: ['Modernização de legado', 'Gestão de equipamentos', 'Integrações corporativas'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Cacau Show',
      role: 'Frontend Angular',
      description:
        'Desenvolvimento de um chat com IA voltado para retorno de receitas da Cacau Show, utilizando Angular e a Design System da marca para garantir consistência visual, aderência à identidade do produto e boa experiência do usuário.',
      stack: ['Angular', 'TypeScript', 'Design System', 'UI corporativa', 'Azure DevOps', 'Git'],
      highlights: ['Chat com IA', 'Experiência do usuário', 'Padronização visual'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Huawei',
      role: 'Fullstack',
      description:
        'Atuação no desenvolvimento de uma aplicação desktop de PDV + retaguarda para o varejo, funcionando como caixa e controle de estoque. Participei da construção de telas, regras operacionais e integrações para sustentar a operação comercial.',
      stack: ['JavaScript', 'jQuery', 'Electron', 'Bootstrap', 'PHP', 'Python'],
      highlights: ['PDV', 'Retaguarda', 'Controle de estoque'],
    },
    {
      badge: 'Outra Coisa',
      company: 'Outra Coisa',
      client: 'SBC — Sociedade Brasileira de Cardiologia',
      role: 'Fullstack',
      description:
        'Criação de aplicação web para gestão de usuários, postagens, avaliações e moderação de conteúdo, conectada a um ecossistema mobile voltado para interação entre cardiologistas, publicações e administração de comunidade.',
      stack: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Git', 'Azure DevOps'],
      highlights: ['Painel administrativo', 'Gestão de comunidade', 'Moderação de conteúdo'],
    },
    {
      badge: 'eNe Soluções',
      company: 'eNe Soluções',
      client: 'Colinas Comigo',
      role: 'Frontend Web e Mobile',
      description:
        'Atuação no desenvolvimento web e mobile de uma solução voltada para venda de empreendimentos, premiação de corretores, consulta de CPF e integração com APIs externas, dentro de um ecossistema com backend Node e microserviços.',
      stack: ['React', 'React Native', 'Node.js', 'Microserviços', 'APIs externas', 'Git'],
      highlights: ['Web + Mobile', 'Mercado imobiliário', 'Integrações externas'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Oi Telecomunicações',
      role: 'Frontend Angular legado',
      description:
        'Manutenção evolutiva e implementação de novas funcionalidades em um projeto legado em Angular 8, garantindo estabilidade da aplicação e continuidade do produto em um contexto corporativo já consolidado.',
      stack: ['Angular 8', 'TypeScript', 'Azure DevOps', 'Git', 'Scrum', 'Kanban'],
      highlights: ['Sistema legado', 'Novas features', 'Estabilidade do produto'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Plataforma de Benefícios Internos',
      role: 'Fullstack',
      description:
        'Desenvolvimento de uma plataforma interna baseada em OpenCart para bonificações e presentes, com regras de pontuação por tempo de casa, troca ou doação de pontos entre funcionários e resgate de produtos personalizados.',
      stack: ['PHP', 'jQuery', 'Bootstrap', 'OpenCart', 'Git', 'Azure DevOps'],
      highlights: ['Gamificação interna', 'Regras de negócio', 'Engajamento de colaboradores'],
    },
  ],
  en: [
    {
      badge: 'Globalweb',
      company: 'Globalweb',
      client: 'BB Assets',
      role: 'Angular Frontend Engineer',
      description:
        'Worked on enterprise projects for BB Assets, building and evolving frontend applications focused on scalability, visual consistency, componentization and long-term maintainability in a corporate environment.',
      stack: ['Angular', 'TypeScript', 'Microfrontends', 'Unit tests', 'Azure DevOps', 'CI/CD'],
      highlights: ['Design System', 'Best practices', 'Modular architecture'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Caterpillar',
      role: 'Angular Frontend Engineer',
      description:
        'Developed a corporate Angular application, contributing to interactive screens, authentication, unit tests and CI/CD workflows to deliver a modern, reliable product ready for continuous evolution.',
      stack: ['Angular', 'TypeScript', 'Unit tests', 'CI/CD', 'Azure DevOps', 'Authentication'],
      highlights: ['Code quality', 'Best practices', 'Continuous delivery'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Ecopetrol',
      role: 'React Frontend Engineer • International project',
      description:
        'First international experience, working on an IoT web application for equipment registration and management, operational monitoring, fault identification and CSV import/export flows.',
      stack: ['React', 'JavaScript', 'IoT', 'CSV Import/Export', 'Azure DevOps', 'Git'],
      highlights: ['International experience', 'Equipment management', 'Operational reporting'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Comgás',
      role: 'Angular Frontend Engineer',
      description:
        'Modernized a legacy Angular application, including framework upgrades and continued product development for an equipment registration and management platform with user authentication and Power BI reporting.',
      stack: ['Angular', 'TypeScript', 'Power BI', 'Authentication', 'Azure DevOps', 'Git'],
      highlights: ['Legacy modernization', 'Equipment management', 'Enterprise integrations'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Cacau Show',
      role: 'Angular Frontend Engineer',
      description:
        'Built an AI chat experience for Cacau Show recipes using Angular and the company design system, ensuring visual consistency, product identity alignment and a polished user experience.',
      stack: ['Angular', 'TypeScript', 'Design System', 'Corporate UI', 'Azure DevOps', 'Git'],
      highlights: ['AI chat', 'User experience', 'Visual consistency'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Huawei',
      role: 'Fullstack Engineer',
      description:
        'Worked on a desktop POS + back-office application for retail, supporting cashier operations and inventory control. I contributed to UI development, business rules and integrations that supported day-to-day store operations.',
      stack: ['JavaScript', 'jQuery', 'Electron', 'Bootstrap', 'PHP', 'Python'],
      highlights: ['POS', 'Back office', 'Inventory control'],
    },
    {
      badge: 'Outra Coisa',
      company: 'Outra Coisa',
      client: 'SBC — Brazilian Society of Cardiology',
      role: 'Fullstack Engineer',
      description:
        'Built a web application for user management, posts, reviews and content moderation, connected to a mobile ecosystem designed for cardiologists to interact, publish content and manage their professional community.',
      stack: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Git', 'Azure DevOps'],
      highlights: ['Admin panel', 'Community management', 'Content moderation'],
    },
    {
      badge: 'eNe Soluções',
      company: 'eNe Soluções',
      client: 'Colinas Comigo',
      role: 'Web & Mobile Frontend Engineer',
      description:
        'Developed web and mobile solutions focused on real estate sales, broker rewards, CPF lookup and external API integrations within an ecosystem powered by Node.js and microservices.',
      stack: ['React', 'React Native', 'Node.js', 'Microservices', 'External APIs', 'Git'],
      highlights: ['Web + Mobile', 'Real estate market', 'External integrations'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Oi Telecommunications',
      role: 'Legacy Angular Frontend Engineer',
      description:
        'Maintained and evolved a legacy Angular 8 project, implementing new features while preserving system stability and ensuring the continuity of an already established corporate product.',
      stack: ['Angular 8', 'TypeScript', 'Azure DevOps', 'Git', 'Scrum', 'Kanban'],
      highlights: ['Legacy system', 'New features', 'Product stability'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Internal Benefits Platform',
      role: 'Fullstack Engineer',
      description:
        'Developed an internal OpenCart-based platform for rewards and gifts, including point rules based on tenure, point exchange or donation between employees and redemption of branded products.',
      stack: ['PHP', 'jQuery', 'Bootstrap', 'OpenCart', 'Git', 'Azure DevOps'],
      highlights: ['Internal gamification', 'Business rules', 'Employee engagement'],
    },
  ],
  es: [
    {
      badge: 'Globalweb',
      company: 'Globalweb',
      client: 'BB Assets',
      role: 'Frontend Angular',
      description:
        'Actuación en proyectos corporativos para BB Assets, desarrollando y evolucionando aplicaciones frontend con foco en escalabilidad, consistencia visual, componentización y mantenimiento continuo.',
      stack: ['Angular', 'TypeScript', 'Microfrontends', 'Pruebas unitarias', 'Azure DevOps', 'CI/CD'],
      highlights: ['Design System', 'Buenas prácticas', 'Arquitectura modular'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Caterpillar',
      role: 'Frontend Angular',
      description:
        'Desarrollo de una aplicación corporativa con Angular, participando en pantallas interactivas, autenticación, pruebas unitarias y flujos de CI/CD para una entrega moderna y confiable.',
      stack: ['Angular', 'TypeScript', 'Pruebas unitarias', 'CI/CD', 'Azure DevOps', 'Autenticación'],
      highlights: ['Calidad de código', 'Buenas prácticas', 'Entrega continua'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Ecopetrol',
      role: 'Frontend React • Proyecto internacional',
      description:
        'Primera experiencia internacional en una aplicación web IoT para registro y gestión de equipos, monitoreo operativo, identificación de fallas e importación/exportación de archivos CSV.',
      stack: ['React', 'JavaScript', 'IoT', 'Importación/Exportación CSV', 'Azure DevOps', 'Git'],
      highlights: ['Experiencia internacional', 'Gestión de equipos', 'Reportes operativos'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Comgás',
      role: 'Frontend Angular',
      description:
        'Modernización de una aplicación Angular legada, incluyendo actualización de versión y continuidad del desarrollo de una plataforma para gestión de equipos, autenticación y reportes integrados con Power BI.',
      stack: ['Angular', 'TypeScript', 'Power BI', 'Autenticación', 'Azure DevOps', 'Git'],
      highlights: ['Modernización legacy', 'Gestión de equipos', 'Integraciones enterprise'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Cacau Show',
      role: 'Frontend Angular',
      description:
        'Desarrollo de un chat con IA para recetas de Cacau Show, utilizando Angular y el Design System de la marca para garantizar consistencia visual, identidad del producto y una experiencia refinada.',
      stack: ['Angular', 'TypeScript', 'Design System', 'UI corporativa', 'Azure DevOps', 'Git'],
      highlights: ['Chat con IA', 'Experiencia de usuario', 'Consistencia visual'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Huawei',
      role: 'Fullstack',
      description:
        'Participación en el desarrollo de una aplicación desktop de PDV + backoffice para retail, funcionando como caja y control de inventario. Contribuí en pantallas, reglas operativas e integraciones.',
      stack: ['JavaScript', 'jQuery', 'Electron', 'Bootstrap', 'PHP', 'Python'],
      highlights: ['PDV', 'Backoffice', 'Control de inventario'],
    },
    {
      badge: 'Outra Coisa',
      company: 'Outra Coisa',
      client: 'SBC — Sociedad Brasileña de Cardiología',
      role: 'Fullstack',
      description:
        'Desarrollo de una aplicación web para gestión de usuarios, publicaciones, evaluaciones y moderación de contenido, conectada a un ecosistema mobile para interacción profesional entre cardiólogos.',
      stack: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Git', 'Azure DevOps'],
      highlights: ['Panel administrativo', 'Gestión de comunidad', 'Moderación de contenido'],
    },
    {
      badge: 'eNe Soluções',
      company: 'eNe Soluções',
      client: 'Colinas Comigo',
      role: 'Frontend Web y Mobile',
      description:
        'Actuación en el desarrollo web y mobile de una solución orientada a ventas inmobiliarias, premiación de corredores, consulta de CPF e integración con APIs externas dentro de un ecosistema con Node.js y microservicios.',
      stack: ['React', 'React Native', 'Node.js', 'Microservicios', 'APIs externas', 'Git'],
      highlights: ['Web + Mobile', 'Mercado inmobiliario', 'Integraciones externas'],
    },
    {
      badge: '3CON',
      company: '3CON',
      client: 'Oi Telecomunicaciones',
      role: 'Frontend Angular legado',
      description:
        'Mantenimiento evolutivo e implementación de nuevas funcionalidades en un proyecto legado en Angular 8, preservando la estabilidad del sistema y la continuidad del producto.',
      stack: ['Angular 8', 'TypeScript', 'Azure DevOps', 'Git', 'Scrum', 'Kanban'],
      highlights: ['Sistema legado', 'Nuevas features', 'Estabilidad del producto'],
    },
    {
      badge: 'BlueShift',
      company: 'BlueShift',
      client: 'Plataforma de Beneficios Internos',
      role: 'Fullstack',
      description:
        'Desarrollo de una plataforma interna basada en OpenCart para bonificaciones y regalos, con reglas de puntos por antigüedad, intercambio o donación de puntos y canje de productos personalizados.',
      stack: ['PHP', 'jQuery', 'Bootstrap', 'OpenCart', 'Git', 'Azure DevOps'],
      highlights: ['Gamificación interna', 'Reglas de negocio', 'Engagement interno'],
    },
  ],
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  private readonly i18n = inject(TranslationService);

  readonly gradients = ['gradient-blue', 'gradient-purple', 'gradient-pink', 'gradient-slate'];

  readonly allCards = computed(() => projectCards[this.i18n.currentLanguage()]);
  readonly visibleCount = signal(4);
  readonly hasMore = computed(() => this.allCards().length > this.visibleCount());
  readonly cards = computed(() => this.allCards().slice(0, this.visibleCount()));

  readonly labels = computed(() => {
    const language = this.i18n.currentLanguage();

    return {
      company: language === 'pt-BR' ? 'Empresa' : language === 'en' ? 'Company' : 'Empresa',
      client: language === 'pt-BR' ? 'Cliente / Projeto' : language === 'en' ? 'Client / Project' : 'Cliente / Proyecto',
      role: language === 'pt-BR' ? 'Atuação' : language === 'en' ? 'Role' : 'Rol',
      stack: language === 'pt-BR' ? 'Tecnologias' : language === 'en' ? 'Technologies' : 'Tecnologías',
      highlights: language === 'pt-BR' ? 'Destaques' : language === 'en' ? 'Highlights' : 'Destacados',
    };
  });

  readonly practices = computed(() => {
    const language = this.i18n.currentLanguage();

    if (language === 'en') {
      return 'Common practices across all projects: Git, GitHub, Azure DevOps, Scrum/Kanban, collaboration with multidisciplinary teams, clean code, evolutionary maintenance and continuous delivery.';
    }

    if (language === 'es') {
      return 'Prácticas recurrentes en todos los proyectos: Git, GitHub, Azure DevOps, Scrum/Kanban, colaboración con equipos multidisciplinarios, clean code, mantenimiento evolutivo y entrega continua.';
    }

    return 'Práticas recorrentes em todos os projetos: Git, GitHub, Azure DevOps, Scrum/Kanban, colaboração com times multidisciplinares, código limpo, manutenção evolutiva e entrega contínua.';
  });

  showMore(): void {
    this.visibleCount.update((count) => Math.min(count + 4, this.allCards().length));
  }
}
