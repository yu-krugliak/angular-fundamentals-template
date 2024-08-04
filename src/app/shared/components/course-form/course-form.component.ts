import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      author: ['', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(2)]],
      courseAuthors: this.fb.array([]),
      duration: ['', [Validators.required, Validators.min(0)]]
    });
  }
  
  get title(){
    return this.courseForm.get('title');
  }

  get description(){
    return this.courseForm.get('description');
  }

  get duration(){
    return this.courseForm.get('duration');
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get author(){
    return this.courseForm.get('author');
  }

  addAuthor(): void {
    if (this.author?.value?.length > 0) {
      const authorControl = this.fb.control(this.author?.value, [Validators.pattern(/^[a-zA-Z0-9]+$/)]);
      this.authors.push(authorControl);
      this.author?.reset();
    }
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  addAuthorToCourse(index: number){
    const author = this.authors.at(index);
    this.courseAuthors.push(author);
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number){
    const author = this.courseAuthors.at(index);
    this.authors.push(author);
    this.courseAuthors.removeAt(index);
  }

  onSubmit() {
    this.courseForm.markAsTouched(); 
    console.log(this.courseForm.status);
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
