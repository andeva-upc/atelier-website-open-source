import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class Team {
  members: TeamMember[] = [
    {
      name: 'Joel Huamani Estefanero',
      role: 'Team Leader',
      description: 'Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. Especializado en liderar y controlar el flujo del proyecto.',
      imageUrl: '/joel.png'
    },
    {
      name: 'Adiel Abdiaz Sanchez Santin',
      role: 'Team Member',
      description: 'Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. Especializado en Front-End.',
      imageUrl: '/adiel.png'
    },
    {
      name: 'Aldo Jeanfranco Machacca Soto',
      role: 'Team Member',
      description: 'Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. Especializado en Web Services.',
      imageUrl: '/aldo.png'
    },
    {
      name: 'Luis Daniel Granda Ibarra',
      role: 'Team Member',
      description: 'Estudiante de la Universidad Peruana de Ciencias Aplicadas cursando la carrera de Ingeniería de Software. Especializado en los datos y visualización del proyecto.',
      imageUrl: '/daniel.png'
    },
    {
      name: 'Mariana Morocho Pinedo',
      role: 'Team Member',
      description: 'Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. Especializada en datos.',
      imageUrl: '/mariana.png'
    }
  ];
}
