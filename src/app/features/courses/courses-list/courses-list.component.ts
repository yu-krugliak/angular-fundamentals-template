import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/store/courses/course';
import { faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  editLogo: IconDefinition = faEdit;
  removeLogo: IconDefinition = faTrash;

  onShowCourse(course: Course) {
    this.showCourse.emit(course);
  }

  onEditCourse(course: Course) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: Course) {
    this.deleteCourse.emit(course);
  }

  handleSearch(searchTerm: string) {
    console.log(searchTerm);
  }
}
