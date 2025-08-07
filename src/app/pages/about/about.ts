import { Component } from '@angular/core';
import {
  Button,
  Win95BackButtonComponent,
  Win95GroupComponent,
  Win95InfoBoxComponent,
} from '@shared/ui';
import { Layout } from '../../core/layout/layout';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    Layout,
    Button,
    Win95GroupComponent,
    Win95InfoBoxComponent,
    Win95BackButtonComponent,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected communityStats = [
    { platform: 'YouTube', metric: '85K+ Subscribers • 750+ Videos', icon: '▶' },
    { platform: 'Instagram', metric: '52K+ Followers', icon: '📷' },
    { platform: 'TikTok', metric: '23K+ Followers • 266K+ Likes', icon: '📱' },
    { platform: 'Twitch', metric: '15K+ Followers • Live Coding', icon: '🎮' },
    { platform: 'Discord', metric: '9K+ Active Community Members', icon: '💬' },
    { platform: 'Twitter/X', metric: '9K+ Followers', icon: '🐦' },
    { platform: 'Kick', metric: '1.5K+ Early Adopters', icon: '🚀' },
    { platform: 'LinkedIn', metric: 'Professional Network', icon: '💼' },
  ];

  protected experience = [
    {
      role: 'Front End Lead Architect & Agile Coach',
      company: 'Erudit AI',
      period: 'Current • Barcelona, Spain',
      description:
        'Leading a team of 8 developers in cutting-edge AI product development. Architecting scalable frontend solutions for enterprise clients while coaching teams in agile methodologies and clean code practices. Driving technical decisions that impact millions of users.',
    },
    {
      role: 'Senior Frontend Architect & Team Lead',
      company: 'Enterprise & Government Clients',
      period: '2009 - Present • 15+ Years',
      description:
        'Delivered mission-critical applications for Fortune 500 companies, government institutions, and international organizations. Led teams of 5-15 developers, architected systems handling millions of daily transactions, and established development standards still in use today.',
    },
    {
      role: 'Founder & Community Builder',
      company: 'Gentleman Programming',
      period: '2019 - Present • 200K+ Global Community',
      description:
        'Built one of the most influential Spanish-speaking developer communities from zero to 200K+ followers. Created 750+ educational videos with 15M+ total views, directly mentored 1000+ developers, and established a thriving ecosystem for tech professionals.',
    },
    {
      role: 'Technical Educator & Author',
      company: 'Platzi, FinGurú, Amazon Publishing',
      period: '2020 - Present',
      description:
        'Certified instructor training 700+ students in advanced TypeScript and Angular at Platzi. Created comprehensive soft skills curriculum at FinGurú. Published bestselling book "Cómo ser front-end sin fallar en el intento" helping thousands launch their tech careers.',
    },
    {
      role: 'Open Source Contributor & Innovation Leader',
      company: 'Global Tech Community',
      period: 'Ongoing',
      description:
        'Creator of Gentleman State Manager (NPM package), active contributor to Angular ecosystem, international conference speaker (freeCodeCamp, Comfeco), and technical thought leader with publications reaching 100K+ developers monthly.',
    },
  ];

  protected achievements = [
    '🏆 Google Developer Expert (GDE) - Elite Angular recognition by Google (top 0.1% developers globally)',
    '🏆 Microsoft MVP (Most Valuable Professional) - Dual recognition from tech giants',
    '📈 15M+ Video Views - Created 750+ educational videos covering programming and tech',
    '👥 200K+ Community Impact - Built largest Spanish-speaking developer community',
    '📚 Amazon Bestselling Author - "Cómo ser front-end sin fallar en el intento"',
    '🎓 Elite Instructor - Trained 700+ students on Platzi in TypeScript & Angular',
    '🔧 NPM Package Creator - Gentleman State Manager with thousands of downloads',
    '🎯 Corporate Trainer - FinGurú course creator for Fortune 500 companies',
    '🌐 International Speaker - freeCodeCamp (3M+ subscribers), Comfeco, major conferences',
    '💰 Enterprise Impact - Led projects worth $10M+ for government and Fortune 500',
    '⚡ Live Coding Pioneer - 15K+ Twitch followers, real-time mentoring innovation',
    '✍️ Technical Thought Leader - Medium publications reaching 100K+ developers monthly',
    '🚀 Team Leadership Excellence - Successfully managed 50+ developers across projects',
    '🌟 Mentorship Legacy - Directly guided 1000+ developers to career success',
    '🔥 Innovation Driver - Established development standards used by teams worldwide',
    '📊 Measurable Results - Students show 40% faster learning with tailored approach',
  ];

  openContact(): void {
    window.location.href = 'mailto:gentleman@ohmybitz.com';
  }

  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/gentleman-programming/', '_blank');
  }
}
