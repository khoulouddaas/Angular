import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {

  searchText: string = '';
  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (response: any) => {
        this.suggestions = response.suggestions ?? response;
      },
      error: (err: any) => console.error('Error loading:', err)
    });
  }

  deleteSuggestion(id: number): void {
    this.suggestionService.deleteSuggestion(id).subscribe({
      next: () => this.loadSuggestions(),
      error: (err: any) => console.error('Error deleting:', err)
    });
  }

  likeSuggestion(s: Suggestion): void {
    const updated: Suggestion = {
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category,
      date: s.date,
      status: s.status,
      nbLikes: (s.nbLikes || 0) + 1,
      suggestion: undefined
    };
    this.suggestionService.updateSuggestion(s.id, updated).subscribe({
      next: () => {
        s.nbLikes = updated.nbLikes; 
      },
      error: (err: any) => console.error('Error updating likes:', err)
    });
  }

  addToFavorites(s: Suggestion): void {
    const exists = this.favorites.some(f => f.id === s.id);
    if (!exists) {
      this.favorites.push(s);
    }
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}