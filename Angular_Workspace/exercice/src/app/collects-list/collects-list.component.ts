import { Component } from '@angular/core';
import { Collect } from '../models/collect';


@Component({
  selector: 'app-collects-list',
  templateUrl: './collects-list.component.html',
  styleUrls: ['./collects-list.component.css']
})
export class CollectsListComponent {

  listeDechets: Collect[] = [
    { id: 1, typeDechet: 'Plastique', zone: 'Zone A', capacite: 1500, date: '2024-12-10', statut: 'En attente' },
    { id: 2, typeDechet: 'Métal',     zone: 'Zone B', capacite: 1200, date: '2024-12-12', statut: 'Collecté' },
    { id: 3, typeDechet: 'Verre',     zone: 'Zone C', capacite: 2000, date: '2024-12-19', statut: 'En cours' }
  ];
}