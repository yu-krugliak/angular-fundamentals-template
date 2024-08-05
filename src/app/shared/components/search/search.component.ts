import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string = 'Input text';
  @Output() search = new EventEmitter<string>();

  constructor(private coursesStore: CoursesStoreService) {} 
  
  searchTerm: string[] = [];

  onSubmit(): void {
    this.coursesStore.searchCourses(this.searchTerm);
    this.search.emit(this.searchTerm[0]);
  }
}

