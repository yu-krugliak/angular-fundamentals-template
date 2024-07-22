import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/store/courses/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: Course | undefined;
  @Input() editable: boolean = false;
  
  @Output() clickOnShow = new EventEmitter<void>();

  onShow() {
    this.clickOnShow.emit();
  }
}
