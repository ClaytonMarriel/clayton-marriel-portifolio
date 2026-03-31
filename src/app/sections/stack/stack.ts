import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface StackCard {
  type: 'frontend' | 'backend' | 'architecture' | 'tools';
  icon: string;
  iconClass: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './stack.html',
  styleUrl: './stack.scss'
})
export class StackComponent {
  readonly cards: StackCard[] = [
    {
      type: 'frontend',
      icon: 'A/R',
      iconClass: 'frontend',
      titleKey: 'stack.frontend.title',
      descriptionKey: 'stack.frontend.description',
      tags: ['Angular', 'React', 'React Native', 'TypeScript', 'JavaScript', 'HTML5', 'SCSS', 'Tailwind CSS', 'RxJS', 'Angular Material', 'MUI', 'Design Systems'],
    },
    {
      type: 'backend',
      icon: '</>',
      iconClass: 'backend',
      titleKey: 'stack.backend.title',
      descriptionKey: 'stack.backend.description',
      tags: ['C#', 'ASP.NET Core', 'REST API', 'Entity Framework', 'Node.js', 'NestJS', 'Express', 'MongoDB', 'MySQL', 'Firebase'],
    },
    {
      type: 'architecture',
      icon: 'MF',
      iconClass: 'architecture',
      titleKey: 'stack.architecture.title',
      descriptionKey: 'stack.architecture.description',
      tags: ['Microfrontends', 'Native Federation', 'Module Federation', 'Componentização', 'Arquitetura modular', 'Clean Code', 'Escalabilidade', 'Testes Unitários'],
    },
    {
      type: 'tools',
      icon: 'Ops',
      iconClass: 'tools',
      titleKey: 'stack.tools.title',
      descriptionKey: 'stack.tools.description',
      tags: ['Git', 'GitHub', 'Azure DevOps', 'CI/CD', 'Scrum', 'Kanban', 'Figma', 'Postman', 'Insomnia', 'Jest'],
    },
  ];

  readonly stripItems = [
    'Angular',
    'React',
    'React Native',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'C#',
    'SCSS',
    'Tailwind',
    'Azure DevOps',
    'Git',
    'CI/CD',
  ];
}
