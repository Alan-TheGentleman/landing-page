import { Component } from '@angular/core';
import {
  Button,
  Win95BackButtonComponent,
  Win95GroupComponent,
  Win95HeaderComponent,
  Win95InfoBoxComponent,
} from '@shared/ui';
import { Layout } from '@src/app/core/layout/layout';

@Component({
  selector: 'app-corporate-training',
  standalone: true,
  imports: [
    Button,
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
      title: 'Frontend Excellence Program',
      description:
        "Transform your team with Angular, React, and TypeScript training from a Google Developer Expert. Proven methods used by Fortune 500 companies, with 40% faster skill acquisition and immediate productivity gains.",
      approach: 'Enterprise-proven curriculum',
      teamSize: 'Teams of 5-50 developers',
      format: 'Intensive workshops + ongoing support',
    },
    {
      title: 'Backend & DevOps Mastery',
      description:
        'Build scalable systems with Node.js, microservices, Docker, and Kubernetes. Learn from real $10M+ projects, with architecture patterns that handle millions of users and enterprise-grade deployment strategies.',
      approach: 'Real-world case studies',
      teamSize: 'Technical teams of any size',
      format: 'Hands-on labs + mentorship',
    },
    {
      title: 'Full-Stack Transformation',
      description:
        "Complete team upskilling from frontend to deployment. Microsoft MVP and Google GDE-led program covering modern development, database design, and production deployment with measurable ROI.",
      approach: 'End-to-end expertise',
      teamSize: 'Cross-functional teams',
      format: 'Project-based learning',
    },
    {
      title: 'Architecture & Leadership',
      description:
        "System design, clean code, testing strategies, and team leadership. Learn from someone who managed 50+ developers across Fortune 500 projects, with proven patterns for scalable architecture and team productivity.",
      approach: 'Leadership + technical skills',
      teamSize: 'Senior developers & architects',
      format: 'Strategic workshops + coaching',
    },
  ];

  protected benefits = [
    'Google GDE & Microsoft MVP expertise - Learn from dual tech giant recognition',
    'Enterprise-proven methods - Used successfully in Fortune 500 companies',
    'Measurable ROI - 40% faster skill development with immediate productivity gains',
    'Real project experience - Work with patterns from $10M+ enterprise applications',
    'Ongoing mentorship - Continued support from 200K+ community leader',
    'Certified completion - Industry-recognized training certificates',
    'Tailored curriculum - Customized to your specific tech stack and business goals',
    'Live coding sessions - Interactive workshops with immediate practical application',
  ];

  openContact(): void {
    window.location.href = 'mailto:gentleman@ohmybitz.com';
  }
}
