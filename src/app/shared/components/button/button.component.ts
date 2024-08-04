import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText?: string;
  @Input() iconName?: IconDefinition;
  @Input() type: string = 'button';
  @Output() click = new EventEmitter<void>();

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onClick() {
    this.click.emit();
  }
}
