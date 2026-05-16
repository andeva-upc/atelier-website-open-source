import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface TeamMember {
  name: string;
  roleKey: string;
  descriptionKey: string;
  imageUrl: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class Team {
  members: TeamMember[] = [
    {
      name: 'Joel Huamani Estefanero',
      roleKey: 'team.members.joel.role',
      descriptionKey: 'team.members.joel.description',
      imageUrl: '/assets/images/joel.png'
    },
    {
      name: 'Adiel Abdiaz Sanchez Santin',
      roleKey: 'team.members.adiel.role',
      descriptionKey: 'team.members.adiel.description',
      imageUrl: '/assets/images/adiel.png'
    },
    {
      name: 'Aldo Jeanfranco Machacca Soto',
      roleKey: 'team.members.aldo.role',
      descriptionKey: 'team.members.aldo.description',
      imageUrl: '/assets/images/aldo.png'
    },
    {
      name: 'Jennifer Yamilet Riveros Vera',
      roleKey: 'team.members.jennifer.role',
      descriptionKey: 'team.members.jennifer.description',
      imageUrl: '/assets/images/jennifer.png'
    },
    {
      name: 'Luis Daniel Granda Ibarra',
      roleKey: 'team.members.daniel.role',
      descriptionKey: 'team.members.daniel.description',
      imageUrl: '/assets/images/daniel.png'
    },
    {
      name: 'Mariana Morocho Pinedo',
      roleKey: 'team.members.mariana.role',
      descriptionKey: 'team.members.mariana.description',
      imageUrl: '/assets/images/mariana.png'
    }
  ];
}
