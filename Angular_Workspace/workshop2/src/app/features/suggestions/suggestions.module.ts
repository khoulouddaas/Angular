import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component'; // ← Add

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent,
    SuggestionFormComponent,
    ListSuggestionComponent // ← Add
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }