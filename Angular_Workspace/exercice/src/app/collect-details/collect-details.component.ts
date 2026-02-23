import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collect } from '../models/collect';

@Component({
  selector: 'app-collect-details',
  templateUrl: './collect-details.component.html',
  styleUrls: ['./collect-details.component.css']
})
export class CollectDetailsComponent implements OnInit {

  C?: Collect;

   collects: Collect[] = [
    { id: 1, typeDechet: 'Plastique', zone: 'Zone A', capacite: 1500, date: '2024-12-10', statut: 'En attente' },
    { id: 2, typeDechet: 'Métal',     zone: 'Zone B', capacite: 1200, date: '2024-12-12', statut: 'Collecté' },
    { id: 3, typeDechet: 'Verre',     zone: 'Zone C', capacite: 2000, date: '2024-12-19', statut: 'En cours' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.C = this.collects.find(x => x.id === id);
  }
}
