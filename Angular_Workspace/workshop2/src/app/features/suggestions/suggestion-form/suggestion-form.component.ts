import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  suggestionId!: number;
  isEditMode = false;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.suggestionId) {
      this.isEditMode = true;
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
        next: (response: any) => {
          const data: Suggestion = response.suggestion;
          if (data) {
            this.suggestionForm.patchValue({
              title:       data.title,
              description: data.description,
              category:    data.category
            });
          }
        },
        error: (err: any) => console.error('Error loading suggestion:', err)
      });
    }
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date:   [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  get title()       { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category()    { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const suggestion: Suggestion = {
        id: this.suggestionId,
        title: this.suggestionForm.get('title')?.value,
        description: this.suggestionForm.get('description')?.value,
        category: this.suggestionForm.get('category')?.value,
        date: new Date(),
        status: 'en attente',
        nbLikes: 0,
        suggestion: undefined
      };

      if (this.isEditMode) {
        this.suggestionService.updateSuggestion(this.suggestionId, suggestion).subscribe({
          next: () => this.router.navigate(['/suggestions']),
          error: (err: any) => console.error('Error updating:', err)
        });
      } else {
        this.suggestionService.addSuggestion(suggestion).subscribe({
          next: () => this.router.navigate(['/suggestions']),
          error: (err: any) => console.error('Error adding:', err)
        });
      }
    }
  }
}