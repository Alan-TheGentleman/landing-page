import { Component } from '@angular/core';
import {
  Button,
  Card,
  Win95GroupComponent,
  Win95HeaderComponent,
  Win95InfoBoxComponent,
  Win95BackButtonComponent,
} from '@shared/ui';
import { Layout } from '@src/app/core/layout/layout';

@Component({
  selector: 'app-corporate-training',
  standalone: true,
  imports: [
    Button,
    Card,
    Layout,
    Win95GroupComponent,
    Win95HeaderComponent,
    Win95InfoBoxComponent,
    Win95BackButtonComponent,
  ],
  templateUrl: './corporate-training.html',
  styleUrl: './corporate-training.scss',
})
export class CorporateTraining {
  protected trainingPrograms = [
    {
      title: 'Modern Frontend Stack',
      description:
        'Comprehensive training on Angular, React, TypeScript, and modern development practices.',
      duration: '2-3 months',
      teamSize: '5-20 developers',
      format: 'Hybrid (Online + On-site)',
    },
    {
      title: 'Backend & DevOps',
      description:
        'Node.js, microservices architecture, Docker, Kubernetes, and CI/CD best practices.',
      duration: '3-4 months',
      teamSize: '5-15 developers',
      format: 'Flexible delivery',
    },
    {
      title: 'Full-Stack Bootcamp',
      description:
        'Complete training program covering frontend, backend, databases, and deployment.',
      duration: '4-6 months',
      teamSize: '10-30 developers',
      format: 'On-site intensive',
    },
  ];

  protected benefits = [
    'Customized curriculum for your tech stack',
    'Hands-on projects with real business scenarios',
    'Code review sessions and best practices',
    'Ongoing support and mentorship',
    'Performance metrics and progress tracking',
    'Certificate of completion',
  ];
}
